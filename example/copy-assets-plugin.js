const fs = require("fs");
const path = require("path");
const { withDangerousMod, withXcodeProject } = require("@expo/config-plugins");

// Helper function to recursively copy files using native Node.js
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyAssets(config) {
  // 1. Android prebuild hook
  config = withDangerousMod(config, [
    "android",
    async (modConfig) => {
      const projectRoot = modConfig.modRequest.projectRoot;
      const sourceDir = path.resolve(projectRoot, "../src/assets");
      const destDir = path.resolve(
        projectRoot,
        "android/app/src/main/assets/codeditor",
      );

      if (fs.existsSync(sourceDir)) {
        copyDirSync(sourceDir, destDir);
        console.log(
          "✅ Web assets successfully copied to Android assets/codeditor",
        );
      } else {
        console.log("❌ Error: Source folder not found at: " + sourceDir);
      }
      return modConfig;
    },
  ]);

  // 2. iOS prebuild hook — copy files
  config = withDangerousMod(config, [
    "ios",
    async (modConfig) => {
      const projectRoot = modConfig.modRequest.projectRoot;
      const projectName = modConfig.modRequest.projectName;
      const sourceDir = path.resolve(projectRoot, "../src/assets");
      const destDir = path.resolve(
        projectRoot,
        `ios/${projectName}/assets/codeditor`,
      );

      if (fs.existsSync(sourceDir)) {
        copyDirSync(sourceDir, destDir);
        console.log(
          `✅ Web assets successfully copied to iOS "${projectName}/assets/codeditor"`,
        );
      } else {
        console.log("❌ Error: Source folder not found at: " + sourceDir);
      }
      return modConfig;
    },
  ]);

  // 3. iOS prebuild hook — add assets folder to Xcode project
  config = withXcodeProject(config, (modConfig) => {
    const xcodeProject = modConfig.modResults;
    const projectName = modConfig.modRequest.projectName;

    // Check if the assets folder reference is already in the project
    const existingRef = Object.values(xcodeProject.hash.project.objects.PBXFileReference || {}).find(
      (ref) => ref && typeof ref === "object" && ref.path === "assets" && ref.lastKnownFileType === "folder",
    );

    if (existingRef) {
      console.log("ℹ️  Assets folder already in Xcode project — skipping");
      return modConfig;
    }

    // Find the main app group (named after the project)
    const groups = xcodeProject.hash.project.objects.PBXGroup || {};
    const mainGroup = Object.entries(groups).find(
      ([, g]) => g && typeof g === "object" && g.name === projectName,
    );

    if (!mainGroup) {
      console.log(`❌ Could not find Xcode group "${projectName}" — assets folder not added`);
      return modConfig;
    }

    const [mainGroupUuid, mainGroupObj] = mainGroup;

    // Add PBXFileReference for the assets folder
    const fileRefUuid = xcodeProject.generateUuid();
    xcodeProject.hash.project.objects.PBXFileReference[fileRefUuid] = {
      isa: "PBXFileReference",
      lastKnownFileType: "folder",
      name: "assets",
      path: "assets",
      sourceTree: '"<group>"',
    };

    // Add a comment entry (required by xcode package)
    xcodeProject.hash.project.objects.PBXFileReference[`${fileRefUuid}_comment`] = "assets";

    // Add to the main group's children array
    if (!mainGroupObj.children) mainGroupObj.children = [];
    mainGroupObj.children.push({ value: fileRefUuid, comment: "assets" });

    // Add PBXBuildFile
    const buildFileUuid = xcodeProject.generateUuid();
    const pbxBuildFile = xcodeProject.hash.project.objects.PBXBuildFile || {};
    pbxBuildFile[buildFileUuid] = {
      isa: "PBXBuildFile",
      fileRef: fileRefUuid,
      settings: "{}",
    };
    pbxBuildFile[`${buildFileUuid}_comment`] = "assets in Resources";
    xcodeProject.hash.project.objects.PBXBuildFile = pbxBuildFile;

    // Add to PBXResourcesBuildPhase of the main target
    const resourcesPhases = xcodeProject.hash.project.objects.PBXResourcesBuildPhase || {};
    for (const [, phase] of Object.entries(resourcesPhases)) {
      if (phase && typeof phase === "object" && Array.isArray(phase.files)) {
        phase.files.push({ value: buildFileUuid, comment: "assets in Resources" });
        break;
      }
    }

    console.log("✅ Assets folder reference added to Xcode project");
    return modConfig;
  });

  return config;
}

module.exports = copyAssets;
