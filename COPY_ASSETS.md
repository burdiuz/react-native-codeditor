# Asset Setup Guide

The editor requires a set of static files (HTML page, CodeMirror JS modules) to be
bundled with the app. These files live in `src/assets/` and must be copied into each
platform's app folder before building.

The library ships an Expo config plugin at `app.plugin.js` (library root) that automates
all of this during `expo prebuild`. The sections below explain what it does and what to do
if you need to set things up manually.

---

## Android

### What the plugin does

Copies `src/assets/` → `android/app/src/main/assets/codeditor/`

Android's asset system serves `file:///android_asset/<path>` URLs to WebView
automatically. No other configuration needed.

### Manual copy (if not using expo prebuild)

```bash
mkdir -p example/android/app/src/main/assets/codeditor
cp -r src/assets/* example/android/app/src/main/assets/codeditor/
```

### URI used by the component

```
file:///android_asset/codeditor/editor.html
```

This is the default `editorUri` in `CodeEditor.tsx` — no extra prop needed for Android.

---

## iOS

iOS has two requirements that Android does not:

1. **The assets must be in the Xcode project** — copied files are not automatically
   included in the app bundle; Xcode must have a folder reference in `project.pbxproj`.
2. **The URI must be computed at runtime** — WKWebView requires an absolute `file://`
   URL and the app bundle path changes with each build.

### What the plugin does

**Step 1 — copies files**

Copies `src/assets/` → `ios/<ProjectName>/assets/codeditor/`

**Step 2 — adds folder reference to Xcode project** (via `withXcodeProject`)

Adds the `assets` folder as a folder reference in `project.pbxproj` so Xcode includes
it in Copy Bundle Resources. Idempotent — if a folder reference named `assets` with
`lastKnownFileType = folder` already exists it does nothing.

The PBXFileReference entry added:
```
{
  isa = PBXFileReference;
  lastKnownFileType = folder;
  name = assets;
  path = <ProjectName>/assets;   ← relative to Xcode project root (ios/)
  sourceTree = "<group>";
}
```

> **Critical:** the `path` must be `<ProjectName>/assets` (e.g. `CodeditorExample/assets`),
> not just `assets`. All file references in this project are relative to the `ios/` directory,
> so a bare `path = assets` tells Xcode to look for `ios/assets` — which doesn't exist.

### Manual setup (if not using expo prebuild, or after expo prebuild --clean)

**Step 1 — copy files**

```bash
mkdir -p example/ios/CodeditorExample/assets/codeditor
cp -r src/assets/* example/ios/CodeditorExample/assets/codeditor/
```

**Step 2 — add folder reference to Xcode project**

Open `example/ios/CodeditorExample.xcworkspace` in Xcode:

1. In the Project Navigator, right-click the `CodeditorExample` group (the blue folder).
2. Choose **Add Files to "CodeditorExample"…**
3. Navigate to and select the `assets` folder inside `CodeditorExample/`.
4. In the options sheet:
   - Set **Added folders** to **Create folder references** (blue folder icon, not yellow).
   - Make sure **Add to targets: CodeditorExample** is checked.
5. Click **Add**.

The folder appears in the navigator with a blue icon. Build the project to verify
the assets are included in the `.app` bundle.

> **Why folder reference, not group?**
> A yellow group copies individual files; it breaks when new language/theme files are
> added. A blue folder reference copies the entire directory tree as-is, so new files
> are included automatically.

### URI used by the component

The `editor.html` path inside the bundle is `assets/codeditor/editor.html`. The
absolute `file://` URL is computed at runtime using `expo-file-system`:

```typescript
import * as FileSystem from 'expo-file-system';

const IOS_EDITOR_URI = Platform.OS === 'ios'
  ? (FileSystem.bundleDirectory ?? '') + 'assets/codeditor/editor.html'
  : undefined;

// Pass to <CodeEditor editorUri={IOS_EDITOR_URI} />
```

`FileSystem.bundleDirectory` resolves to the `.app` folder path (e.g.
`file:///var/containers/Bundle/Application/<UUID>/CodeditorExample.app/`).
The combined path points to the bundled HTML file regardless of where iOS installed
the app.

**Path derivation:**
- Assets copied to: `ios/CodeditorExample/assets/codeditor/`
- Xcode bundles them as: `MyApp.app/assets/codeditor/`
- `FileSystem.bundleDirectory` returns: `file:///path/to/MyApp.app/`
- Full URI: `file:///path/to/MyApp.app/assets/codeditor/editor.html`

### After adding expo-file-system to a new project

`expo-file-system` has a native iOS module. If you add it fresh to a project:

```bash
# Install
npm install expo-file-system

# Re-run pod install so the native module is linked
cd ios
LANG=en_US.UTF-8 PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH" \
  ~/.local/share/gem/ruby/3.3.0/bin/pod install
cd ..
```

In this project it is already linked — `ExpoFileSystem` is present in `Podfile.lock`.

---

## Updating assets (when codemirror-package changes)

```bash
# Regenerate src/assets/ from node_modules
npm run copy-assets

# Then sync to both platforms:
cp -r src/assets/* example/android/app/src/main/assets/codeditor/
cp -r src/assets/* example/ios/CodeditorExample/assets/codeditor/

# Rebuild
cd example && npx expo run:android   # or run:ios
```

`npm run prepare` runs `copy-assets` automatically before building the library, so
`src/assets/` is always up to date after a prepare.
