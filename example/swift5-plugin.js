const { withDangerousMod } = require("expo/config-plugins");
const fs = require("fs");
const path = require("path");

const MARKER = "# [swift5-plugin]";

// expo-modules-core uses @MainActor conformance patterns that Xcode 16 / Swift 6
// strict concurrency mode rejects. Force Swift 5 + minimal concurrency checking.
// The Swift-6-only source syntax is patched via patches/expo-modules-core+*.patch
// (applied by patch-package on postinstall).
const SNIPPET = `    ${MARKER}
    expo_swift6_targets = %w[Expo ExpoModulesCore ExpoModulesJSI]
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['SWIFT_STRICT_CONCURRENCY'] = 'minimal'
        if expo_swift6_targets.include?(target.name)
          config.build_settings['SWIFT_VERSION'] = '5'
        end
      end
    end
`;

module.exports = function withSwift5(config) {
  return withDangerousMod(config, [
    "ios",
    (modConfig) => {
      const podfile = path.join(modConfig.modRequest.platformProjectRoot, "Podfile");
      let contents = fs.readFileSync(podfile, "utf8");
      if (contents.includes(MARKER)) return modConfig;

      // Insert at the end of react_native_post_install(...) inside post_install.
      const re = /(react_native_post_install\([\s\S]*?\n\s*\)\n)/;
      if (!re.test(contents)) {
        console.warn("[swift5-plugin] ⚠️  react_native_post_install not found in Podfile; skipped");
        return modConfig;
      }
      contents = contents.replace(re, `$1${SNIPPET}`);
      fs.writeFileSync(podfile, contents);
      return modConfig;
    },
  ]);
};
