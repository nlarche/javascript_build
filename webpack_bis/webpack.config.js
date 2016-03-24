/* global __dirname */
/* global process */
var path = require('path');

var node_dir = path.join(__dirname, 'node_modules');
var bower_dir = path.join(__dirname, 'vendor');

var production = process.env.NODE_ENV === 'production';

var staticDir = production ? path.resolve(__dirname, './') : require('./webpack/webpack.config.dev.js').STATIC_DIRECTORY;

var loaders = require('./webpack/webpack.loaders.js')(__dirname, staticDir, production);

var plugins = require('./webpack/webpack.plugins.js')();

var config = {
	context: __dirname,
	entry: {
		// voir fin config
		vendor: ['./vendor.js'],
		'static': path.join(staticDir, 'index.js'),
		'static-css': path.join(staticDir, 'index-css.js'),
		app: './app.js'
	},
	output: {},
	resolve: {
		root: [node_dir, bower_dir],
		alias: {}
	},
	module: {
		noParse: [],
		loaders: loaders
	},
	plugins: plugins,
	addVendor: function (name, path) {
		this.resolve.alias[name] = path;
		this.module.noParse.push(new RegExp(path));
		this.entry.vendor.push(name);
	}
};

// Bower dependencies
config.addVendor('moment', path.join(bower_dir, 'moment/moment.js'));
config.addVendor('jquery', path.join(bower_dir, 'jquery/dist/jquery.js'));
config.addVendor('modernizr', path.join(bower_dir, 'modernizr/modernizr.js'));
config.addVendor('detectizr', path.join(bower_dir, 'detectizr/dist/detectizr.js'));


// Config PROD uniquement
if (production) {

	var prod = require('./webpack/webpack.prod.js');

	config.output = prod.output;
	config.plugins = config.plugins.concat(prod.plugins);

} else {

	var dev = require('./webpack/webpack.dev.js');

	config.devtool = dev.devtool;
	config.output = dev.output;
	config.plugins = config.plugins.concat(dev.plugins);
	config.devServer = dev.devServer;
}

module.exports = config;
