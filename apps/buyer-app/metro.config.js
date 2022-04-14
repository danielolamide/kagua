const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const workspaceRoot = path.resolve(__dirname, "../..");
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);
//const { resolver, transformer } = config;

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
	path.resolve(workspaceRoot, "node_modules"),
	path.resolve(projectRoot, "node_modules"),
];

//config.transformer = {
//...transformer,
//babelTransformerPath: require.resolve("react-native-svg-transformer"),
//};

//config.resolver = {
//...resolver,
//assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
//sourceExts: [...resolver.sourceExts, "svg"]
//};

module.exports = config;
