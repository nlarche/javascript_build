var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var node_dir = path.join(__dirname, 'node_modules');
var bower_dir = path.join(__dirname, 'vendor');

var production = process.env.NODE_ENV === 'production';

var targetDir = '../../../target/';

var config = {
	context: __dirname,
	entry: {
		// voir fin config
		vendor: [],
		'static': '../../../../../utilitaires/static-content/src/main/webapp/angular/index.js', // path.join(targetDir, 'static/angular/index.js'), //,
		app: './app.js'
	},
	output: {},
	resolve: {
		root: [node_dir, bower_dir],
		alias: {}
	},
	module: {
		noParse: [],
		loaders: [{
				//Images{
				test: /\.html$/,
				loader: 'raw',
				exclude: [/node_modules/, /vendor/]
			}, {
				//Images{
				test: /\.(png|jpg|svg)$/,
				loader: 'url?limit=25000',
				exclude: [/node_modules/, /vendor/]
			},
			// SASS
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass"],
				exclude: [/node_modules/, /vendor/]
			}, {
				test: /[\\\/]node_modules[\\\/]nanoscroller[\\\/]bin[\\\/]css[\\\/]nanoscroller[\\\/]\.css$/,
				loaders: ["style", "css"]
			},
			// Hack pour Modernizr
			{
				test: /[\\\/]vendor[\\\/]modernizr[\\\/]modernizr\.js$/,
				loader: "imports?this=>window!exports?window.Modernizr"
			}, {
				test: /[\\\/]vendor[\\\/]detectizr[\\\/]dist[\\\/]detectizr\.js$/,
				loader: "imports?this=>window!exports?window.Detectizr"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
			inject: 'body'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
			//filename: 'vendor.[hash].js'
		}),
		//Chargement des locales FR uniquement
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr.js/),
		// Expose des variables globales
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			moment: 'moment',
			Modernizr: 'modernizr',
			modernizr: 'modernizr',
			"window.Modernizr": 'modernizr',
			'pidCrypt': 'pidcrypt'
				//Detectizr: 'detectizr',			
		})
	],
	addVendor: function (name, path) {
		this.resolve.alias[name] = path;
		this.module.noParse.push(new RegExp(path));
		this.entry.vendor.push(name);
	},
};

// Node dependencies
var vendor = [
	'angular',
	'angular-route',
	'angular-touch',
	'angular-resource',
	'angular-cookies',
	'angular-messages',
	'angular-utils-pagination',
	'angular-filter',
	'angular-foundation',
	'angular-svg-round-progressbar',
	'd3',
	'nanoscroller',
	'moment',
	'jquery-ui',
	'underscore',
	'iscroll',
	'classie',
	'sticky-table-headers',
	'pidcrypt/rsa',
	'pidcrypt/asn1',
];

config.entry.vendor = vendor;

// Bower dependencies
config.addVendor('angular-i18n', path.join(node_dir, '/angular-i18n/angular-locale_fr-fr.js'));
config.addVendor('jquery', path.join(bower_dir, 'jquery/dist/jquery'));
config.addVendor('modernizr', path.join(bower_dir, 'modernizr/modernizr.js'));
config.addVendor('file-saver', path.join(bower_dir, 'file-saver.js/FileSaver.js'));
config.addVendor('angular-piwik', path.join(bower_dir, 'angular-piwik/angular-piwik.js'));
config.addVendor('detectizr', path.join(bower_dir, 'detectizr/dist/detectizr.js'));


// Config PROD uniquement
if (production) {
	config.output = {
		path: path.join(targetDir, 'cr/dist'),
		filename: '[name].[hash].js',
		chunkFilename: 'vendor.[hash].js'
	};
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}));
	config.plugins.push(new HtmlWebpackPlugin({
		template: 'index.html',
		inject: 'body',
		minify: {
			collapseWhitespace: true
		},
	}));
	config.plugins.push(parseIndexHtml);

} else {
	//config DEV uniquement
	config.devtool = 'source-map';
	config.output = {
		path: __dirname,
		filename: '[name].js',
		chunkFilename: 'vendor.js',
		publicPath: 'http://localhost:3000/'
	};

	var proxyUrl = 'http://10.10.40.13:8081/cr/';	

	config.devServer = {
		/* Send API requests on localhost to API server get around CORS */
		proxy: {
			'/rest/*': {
				target: proxyUrl,
				bypass: addCasUser
			},
			'./**/*.html': {
				target: proxyUrl,
				bypass: addCasUser
			},
			'/angular/**/*.html': {
				target: proxyUrl,
				bypass: addCasUser
			},
			'/**/*.css': {
				target: proxyUrl,
				bypass: addCasUser
			},
			'/fonts/*': {
				target: proxyUrl,
				bypass: addCasUser
			},
			'/images/*': {
				target: proxyUrl,
				bypass: addCasUser
			}
		}
	};
}

module.exports = config;

function addCasUser(req, res, proxyOptions) {
	req.headers['CAS-User'] = '----------';
}


// // // To rewrite stuff like `bundle.js` to `bundle-[hash].js` in files that refer to it, I tried and
// // // didn't like the following plugin: https://github.com/ampedandwired/html-webpack-plugin
// // // for 2 reasons:
// // //    1. because it didn't work with HMR dev mode...
// // //    2. because it's centered around HTML files but I also change other files...
// // // I hope we can soon find something standard instead of the following hand-coding.
// function parseIndexHtml() {
// 	this.plugin("done", function (stats) {
// 		var replaceInFile = function (filePath, toReplace, replacement) {
// 			var replacer = function (match) {
// 				console.log('Replacing in %s: %s => %s', filePath, match, replacement);
// 				return replacement;
// 			};
// 			var str = fs.readFileSync(filePath, 'utf8');
// 			var out = str.replace(new RegExp(toReplace, 'g'), replacer);
// 			fs.writeFileSync(filePath, out);
// 		};

// 		var hash = stats.hash; // Build's hash, found in `stats` since build lifecycle is done.


// 		replaceInFile('index.html', '<script src="https://localhost:3000/app.js"></script>', '');
// 		replaceInFile('index.html', '<script src="https://localhost:3000/static.js"></script>', '');
// 		replaceInFile('index.html', '<script src="https://localhost:3000/vendor.js"></script>', '');


// 		// replaceInFile('index.html', 'https://localhost:3000/app.js', 'dist/app.' + hash + '.js');
// 		// replaceInFile('index.html', 'https://localhost:3000/static.js', 'dist/static.' + hash + '.js');
// 		// replaceInFile('index.html', 'https://localhost:3000/vendor.js', 'dist/vendor.' + hash + '.js');
// 	});
// }
