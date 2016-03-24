var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var config = {};

// Configuration de la sortie
var output = {
	path : path.join(__dirname, '../dist'),
	filename: '[name].[hash].js',
	chunkFilename: 'vendor.[hash].js'
};

// configuration des plugins de PROD
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false
	}
});

var htmlWebpackPlugin = new HtmlWebpackPlugin({
	template: 'index.html',
	inject: 'body',
	minify: {
		collapseWhitespace: true,
		removeComments: false
	},
});

var pagination = '../../angular/pagination/pagination.html';

var definePlugin = new webpack.DefinePlugin({
	PAGINATION_DIR: JSON.stringify(pagination)
});

config.output = output;

config.plugins = [uglifyJsPlugin, htmlWebpackPlugin, definePlugin];

module.exports = config;
	