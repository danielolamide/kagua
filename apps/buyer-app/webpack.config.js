const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
	const config = await createExpoWebpackConfigAsync(
		{
			...env,
			babel: {
				dangerouslyAddModulePathsToTranspile: [
					"@kagua/ui",
					"@kagua/lib",
					"@kagua/api",
				],
			},
		},
		argv
	);

	return config;
};
