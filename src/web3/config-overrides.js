const {
	override,
	addWebpackModuleRule,
	addWebpackPlugin,
} = require("customize-cra");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = override(
	addWebpackModuleRule({
		test: /\.(gif|png|jpe?g|svg)$/i,
		use: [
			"file-loader",
			{
				loader: "image-webpack-loader",
				options: {
					mozjpeg: {
						progressive: true,
						quality: 65,
					},
					optipng: {
						enabled: false,
					},
					pngquant: {
						quality: [0.65, 0.9],
						speed: 4,
					},
					gifsicle: {
						interlaced: false,
					},
					webp: {
						quality: 75,
					},
				},
			},
		],
	}),
	addWebpackPlugin(new BundleAnalyzerPlugin()) // Add this line
);
