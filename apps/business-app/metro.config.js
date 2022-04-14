const { getDefaultConfig } = require("expo/metro-config")
const path = require("path");

const workspaceRoot = path.resolve(__dirname, "../..");
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
	path.resolve(workspaceRoot, "node_modules"),
	path.resolve(projectRoot, "node_modules")
];

module.exports = config;
