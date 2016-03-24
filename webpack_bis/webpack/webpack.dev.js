//config DEV uniquement
/* global __dirname */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var configDev = require('./webpack.config.dev.js');

var config = {};

config.devtool = 'source-map';
config.output = {
    path: __dirname,
    filename: '[name].js',
    chunkFilename: 'vendor.js',
    publicPath: 'http://' + configDev.IP + ':3000/'
};

var htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: 'index.html',
    inject: 'body'
});

var definePlugin = new webpack.DefinePlugin({
    PAGINATION_DIR: JSON.stringify(configDev.STATIC_DIRECTORY + 'angular/pagination/pagination.html')
});

config.plugins = [htmlWebpackPlugin, definePlugin];

config.devServer = {
    proxy: {
        '/rest/*': {
            target: configDev.SERVER_URL,
            bypass: addCasUser
        },
        '/dev/rest/*': {
            target: configDev.SERVER_URL,
            bypass: addCasUser
        }
    },
    host : configDev.IP
};

function addCasUser(req, res, proxyOptions) {
    if (configDev.CAS_USER) {
        req.headers['CAS-User'] = configDev.CAS_USER;
    }
}

module.exports = config;
