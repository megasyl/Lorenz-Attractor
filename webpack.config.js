const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(__dirname);
module.exports = {
	target: 'web',
	devtool: 'source-map',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'www'),
		filename: 'bundle.js',
		publicPath: ''
	},
	/*plugins: [
		new HtmlWebpackPlugin({
			title: 'Lorrenz Attractor',
			filename: 'index.html'
		})
	],*/
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, 'src')
				],
				loader: 'babel-loader',
				query: {
					compact: true,
					presets: [
						['es2015', {modules: false}]
					]
				}
			}
		]
	}
};
