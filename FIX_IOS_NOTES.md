# iOS Build Fix Notes — Expo SDK 55 / React Native 0.83 / Xcode 16

## Environment

| Item | Version |
|---|---|
| Expo SDK | 55 |
| React Native | 0.83.6 |
| expo-modules-core | 55.0.25 |
| react-native-webview | 13.16.1 |
| Xcode | 16 |
| Swift compiler | Swift 6 (bundled with Xcode 16) |
| macOS | Sonoma (Darwin 23.6.0) |

---

## Problem 1: `pod install` failing due to Ruby 4.0 incompatibility

### Background

Homebrew's `cocoapods` formula depends on its own `ruby` formula. As of May 2026,
Homebrew's default Ruby is 4.0.x. Ruby 4.0 removed many gems that were previously
part of the standard library:

- `mutex_m`
- `minitest`
- `bigdecimal`
- `base64`
- `kconv` (not published as a standalone gem — no fix available)

CocoaPods 1.16.2's dependencies (`activesupport`, `httpclient`, `xcodeproj`) assume
these exist in stdlib. The result is a cascade of `LoadError: cannot load such file`
errors each time a new missing gem is discovered. The cascade terminates fatally at
`kconv` which cannot be installed at all.

Additionally, RVM's Ruby 3.2.1 (present on this machine) was built without OpenSSL,
so `gem install` over HTTPS fails there too.

### Error sequence seen

```
Unable to resolve dependency: 'activesupport (>= 5.0, < 8)' requires 'base64 (>= 0)'
→ gem install base64

Unicode Normalization not appropriate for ASCII-8BIT (Encoding::CompatibilityError)
→ LANG=en_US.UTF-8 pod install

LoadError - cannot load such file -- kconv
→ no fix — kconv is not a standalone gem
```

### Fix: install CocoaPods as a gem under Homebrew Ruby 3.3

**Step 1: Install Ruby 3.3 via Homebrew**
```bash
brew install ruby@3.3
```
This installs to `/opt/homebrew/opt/ruby@3.3/`. It is keg-only (not linked into PATH
by default).

**Step 2: Install CocoaPods gem under Ruby 3.3**
```bash
PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH" gem install cocoapods --no-document
```
RubyGems installs to the user gem dir: `~/.local/share/gem/ruby/3.3.0/`.
The `pod` binary lands at `~/.local/share/gem/ruby/3.3.0/bin/pod`.

**Step 3: Remove the broken Homebrew CocoaPods formula**
```bash
brew remove cocoapods
# Homebrew auto-removes ruby 4.0 as now-unneeded dependency
```

**Step 4: Run pod install going forward**
```bash
LANG=en_US.UTF-8 PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH" \
  ~/.local/share/gem/ruby/3.3.0/bin/pod install
```

Or add permanently to `~/.zshrc`:
```bash
export PATH="/opt/homebrew/opt/ruby@3.3/bin:$HOME/.local/share/gem/ruby/3.3.0/bin:$PATH"
```
After that, plain `pod install` works.

### Gemfile (optional but recommended)

Created `example/ios/Gemfile` to pin the CocoaPods version used by the project:
```ruby
source 'https://rubygems.org'
gem 'cocoapods', '~> 1.16'
```

### Notes

- `npx expo run:ios` does NOT re-run pod install automatically if `Pods/` already
  exists and is up to date. You only need to re-run pod install when the Podfile changes
  or after `pod deintegrate` / `--clean` operations.
- `npx expo prebuild --clean` DOES regenerate the Podfile from Expo's template and runs
  pod install. It would overwrite any manual Podfile edits (see Problem 2 below).

---

## Problem 2: Swift 6 strict concurrency errors from expo-modules-core

### Background

Xcode 16 ships with the Swift 6 compiler. `expo-modules-core` 55.x was written
targeting Swift 5.9/5.10 concurrency semantics and uses patterns that are rejected in
Swift 6 strict mode.

Additionally, Expo's autolinking `post_install` hook explicitly sets
`SWIFT_VERSION = 6` for `ExpoModulesCore`, `Expo`, and `ExpoModulesJSI` pod targets.
In Swift 6 language mode, strict concurrency is a language-level feature — the
`SWIFT_STRICT_CONCURRENCY` build setting has no effect in Swift 6 mode.

### Root cause analysis

Two distinct categories of errors were observed, driven by two different root causes:

**Kind A — strict concurrency violations (21 errors):**

These appear because ExpoModulesCore is compiled in Swift 6 mode (Expo sets
`SWIFT_VERSION = 6`), and Swift 6 enforces actor isolation at the language level.
Examples:
```
call to main actor-isolated initializer 'init' in a synchronous nonisolated context
main actor-isolated property 'props' can not be referenced from a nonisolated context
main actor-isolated instance method 'X' cannot be used to satisfy nonisolated protocol requirement
stored property of 'Sendable'-conforming class has non-sendable type
```

**Kind B — invalid `@MainActor` conformance syntax (3 errors):**

expo-modules-core 55.0.25 uses a `@MainActor` placement syntax in 3 files that is
not valid in any shipping Swift version (neither Swift 5 nor Swift 6):

```swift
extension UIView: @MainActor AnyArgument { }                             // ViewDefinition.swift:121
extension ExpoSwiftUI.SwiftUIVirtualView: @MainActor ExpoSwiftUI.ViewWrapper { }  // SwiftUIVirtualView.swift:196
class HostingView<…>: ExpoView, @MainActor AnyExpoSwiftUIHostingView { } // SwiftUIHostingView.swift:45
```

Error: `unknown attribute 'MainActor'`

Placing `@MainActor` directly on a specific protocol in a conformance/inheritance
list (rather than on the whole type or extension) is a syntax that was experimented
with in Swift 6 pre-releases but was not included in any final released Swift version.
It is rejected by the Swift 6 compiler in both Swift 5 and Swift 6 language modes.

### What was tried and why it didn't fully work

| Attempt | Result |
|---|---|
| `SWIFT_STRICT_CONCURRENCY = minimal` for all targets | 24 → 3 errors. Suppresses Kind A errors in Swift 5 targets, but ExpoModulesCore (Swift 6 mode) ignores it — Swift 6 strict concurrency is language-level |
| + `SWIFT_VERSION = '5.0'` for all targets | 3 errors. Overrides ExpoModulesCore to Swift 5 so `minimal` works, but Swift 5.0 predates `@MainActor` (Swift 5.5) → Kind B errors remain |
| + `SWIFT_VERSION = '5.9'` for all targets | 3 errors. Same result — `5.9` is not a meaningful distinct value; Xcode treats all `5.x` as Swift 5 language mode |
| Remove `SWIFT_VERSION` override (keep only `minimal`) | 24 errors. ExpoModulesCore reverts to Expo's Swift 6 setting; `minimal` is ineffective again |

Key insight: there is no single `SWIFT_VERSION` value that simultaneously:
- Enables `@MainActor` (requires ≥ 5.5)
- Allows the `@MainActor`-on-conformance syntax in the 3 problematic files (not valid in any released version)
- Allows `SWIFT_STRICT_CONCURRENCY = minimal` to suppress the remaining concurrency errors (only works in Swift 5 mode)

### Final fix (two-part)

#### Part 1: patch-package — fix the 3 invalid source files

Install `patch-package` at the workspace root and remove `@MainActor` from the
three conformance positions. Since UIView, SwiftUIVirtualView, and HostingView are all
UIKit subclasses (inherently main-thread), removing `@MainActor` from the protocol
conformance position does not change runtime behaviour.

**Files patched** (patch stored at `patches/expo-modules-core+55.0.25.patch`):

```
node_modules/expo-modules-core/ios/Core/Views/ViewDefinition.swift:121
  Before: extension UIView: @MainActor AnyArgument {
  After:  extension UIView: AnyArgument {

node_modules/expo-modules-core/ios/Core/Views/SwiftUI/SwiftUIVirtualView.swift:196
  Before: extension ExpoSwiftUI.SwiftUIVirtualView: @MainActor ExpoSwiftUI.ViewWrapper {
  After:  extension ExpoSwiftUI.SwiftUIVirtualView: ExpoSwiftUI.ViewWrapper {

node_modules/expo-modules-core/ios/Core/Views/SwiftUI/SwiftUIHostingView.swift:45
  Before: …: ExpoView, @MainActor AnyExpoSwiftUIHostingView {
  After:  …: ExpoView, AnyExpoSwiftUIHostingView {
```

**Setup:**

```bash
# Install patch-package
npm install --save-dev patch-package

# After editing the 3 files:
npx patch-package expo-modules-core
```

Add to `package.json` `scripts` so the patch re-applies automatically after `npm install`:
```json
"postinstall": "patch-package"
```

#### Part 2: Podfile — override Swift version for Expo targets

Expo's autolinking hook sets `SWIFT_VERSION = 6` for `ExpoModulesCore`, `Expo`, and
`ExpoModulesJSI`. In Swift 6 mode the `SWIFT_STRICT_CONCURRENCY = minimal` setting is
silently ignored. The `post_install` block overrides those three targets back to Swift
5 so the minimal flag takes effect.

```ruby
post_install do |installer|
  react_native_post_install(
    installer,
    config[:reactNativePath],
    :mac_catalyst_enabled => false,
    :ccache_enabled => ccache_enabled?(podfile_properties),
  )
  # expo-modules-core uses @MainActor conformance patterns that Xcode 16 / Swift 6
  # strict concurrency mode rejects. 'minimal' restores Swift 5 behaviour.
  # Expo sets SWIFT_VERSION = 6 for ExpoModulesCore/Expo/ExpoModulesJSI, but Swift 6
  # ignores SWIFT_STRICT_CONCURRENCY = minimal. Override those back to Swift 5 so the
  # minimal flag takes effect. The 3 source files that used Swift-6-only @MainActor
  # conformance syntax are patched via patches/expo-modules-core+55.0.25.patch.
  expo_swift6_targets = %w[Expo ExpoModulesCore ExpoModulesJSI]
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['SWIFT_STRICT_CONCURRENCY'] = 'minimal'
      if expo_swift6_targets.include?(target.name)
        config.build_settings['SWIFT_VERSION'] = '5'
      end
    end
  end
end
```

### Full step-by-step to apply the fix on a new machine

```bash
# 1. Install patch-package (if not already in devDependencies)
npm install

# 2. The postinstall script auto-applies patches/expo-modules-core+55.0.25.patch.
#    Verify the 3 files were patched:
grep "extension UIView: AnyArgument" node_modules/expo-modules-core/ios/Core/Views/ViewDefinition.swift

# 3. Run pod install with Ruby 3.3
cd example/ios
LANG=en_US.UTF-8 PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH" \
  ~/.local/share/gem/ruby/3.3.0/bin/pod install
cd ..

# 4. Clear DerivedData
rm -rf ~/Library/Developer/Xcode/DerivedData/

# 5. Build
npx expo run:ios
```

---

## Summary of all changes made

| File | Change |
|---|---|
| `example/ios/Podfile` | Added `post_install` block with `SWIFT_STRICT_CONCURRENCY = minimal` for all targets and `SWIFT_VERSION = '5'` for Expo Swift 6 targets |
| `example/ios/Gemfile` | Created — pins `cocoapods ~> 1.16` |
| `patches/expo-modules-core+55.0.25.patch` | Created — removes invalid `@MainActor` from 3 conformance positions |
| `package.json` | Added `"postinstall": "patch-package"` to auto-apply patch after `npm install` |

| Fix | Status |
|---|---|
| Ruby 3.3 for pod install | ✅ Working |
| `SWIFT_STRICT_CONCURRENCY = minimal` in Podfile | ✅ Applied |
| `SWIFT_VERSION = '5'` for Expo Swift 6 targets | ✅ Applied |
| patch-package for 3 invalid `@MainActor` conformance sites | ✅ Applied |
| iOS build | ⏳ Pending verification |
