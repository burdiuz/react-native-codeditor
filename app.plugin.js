const { withDangerousMod, withXcodeProject } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

// Resolved once at require-time — works both when published (node_modules/react-native-codeditor/)
// and when linked from a monorepo workspace (package root).
const ASSETS_SRC = path.resolve(__dirname, "src/assets");

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function withCodeditorAssets(config) {
  // ── Android ──────────────────────────────────────────────────────────────
  config = withDangerousMod(config, [
    "android",
    (modConfig) => {
      const destDir = path.resolve(
        modConfig.modRequest.projectRoot,
        "android/app/src/main/assets/codeditor"
      );
      if (!fs.existsSync(ASSETS_SRC)) {
        console.warn("[@actualwave/react-native-codeditor] ⚠️  src/assets not found — run `npm run prepare` in the library first");
        return modConfig;
      }
      copyDirSync(ASSETS_SRC, destDir);
      console.log("[@actualwave/react-native-codeditor] ✅ Android assets copied to android/app/src/main/assets/codeditor");
      return modConfig;
    },
  ]);

  // ── iOS: copy files ───────────────────────────────────────────────────────
  config = withDangerousMod(config, [
    "ios",
    (modConfig) => {
      const { projectRoot, projectName } = modConfig.modRequest;
      const destDir = path.resolve(projectRoot, `ios/${projectName}/assets/codeditor`);
      if (!fs.existsSync(ASSETS_SRC)) {
        console.warn("[@actualwave/react-native-codeditor] ⚠️  src/assets not found — run `npm run prepare` in the library first");
        return modConfig;
      }
      copyDirSync(ASSETS_SRC, destDir);
      console.log(`[@actualwave/react-native-codeditor] ✅ iOS assets copied to ios/${projectName}/assets/codeditor`);
      return modConfig;
    },
  ]);

  // ── iOS: add folder reference to Xcode project ───────────────────────────
  config = withXcodeProject(config, (modConfig) => {
    const xcodeProject = modConfig.modResults;
    const { projectName } = modConfig.modRequest;

    // Idempotent — skip if already present
    const existing = Object.values(
      xcodeProject.hash.project.objects.PBXFileReference || {}
    ).find(
      (ref) =>
        ref &&
        typeof ref === "object" &&
        ref.name === "assets" &&
        ref.lastKnownFileType === "folder"
    );
    if (existing) {
      return modConfig;
    }

    // Find the main app group (named after the project)
    const groups = xcodeProject.hash.project.objects.PBXGroup || {};
    const mainGroupEntry = Object.entries(groups).find(
      ([, g]) => g && typeof g === "object" && g.name === projectName
    );
    if (!mainGroupEntry) {
      console.warn(
        `[@actualwave/react-native-codeditor] ⚠️  Xcode group "${projectName}" not found — add the assets folder reference manually`
      );
      return modConfig;
    }
    const [, mainGroupObj] = mainGroupEntry;

    // PBXFileReference
    // path must be relative to the Xcode project root (ios/), so it includes the project name.
    const fileRefUuid = xcodeProject.generateUuid();
    xcodeProject.hash.project.objects.PBXFileReference[fileRefUuid] = {
      isa: "PBXFileReference",
      lastKnownFileType: "folder",
      name: "assets",
      path: `${projectName}/assets`,
      sourceTree: '"<group>"',
    };
    xcodeProject.hash.project.objects.PBXFileReference[`${fileRefUuid}_comment`] = "assets";

    // Add to group children
    if (!mainGroupObj.children) mainGroupObj.children = [];
    mainGroupObj.children.push({ value: fileRefUuid, comment: "assets" });

    // PBXBuildFile
    const buildFileUuid = xcodeProject.generateUuid();
    const pbxBuildFile = xcodeProject.hash.project.objects.PBXBuildFile || {};
    pbxBuildFile[buildFileUuid] = {
      isa: "PBXBuildFile",
      fileRef: fileRefUuid,
      settings: "{}",
    };
    pbxBuildFile[`${buildFileUuid}_comment`] = "assets in Resources";
    xcodeProject.hash.project.objects.PBXBuildFile = pbxBuildFile;

    // Add to PBXResourcesBuildPhase
    const resourcesPhases =
      xcodeProject.hash.project.objects.PBXResourcesBuildPhase || {};
    for (const [, phase] of Object.entries(resourcesPhases)) {
      if (phase && typeof phase === "object" && Array.isArray(phase.files)) {
        phase.files.push({ value: buildFileUuid, comment: "assets in Resources" });
        break;
      }
    }

    console.log("[@actualwave/react-native-codeditor] ✅ Xcode folder reference added to project.pbxproj");
    return modConfig;
  });

  return config;
}

module.exports = withCodeditorAssets;
