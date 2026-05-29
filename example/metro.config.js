const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// ADD THIS PART:
config.resolver.extraNodeModules = {
  '@actualwave/react-native-codeditor': workspaceRoot,
};

config.resolver.disableHierarchicalLookup = true;

module.exports = config;