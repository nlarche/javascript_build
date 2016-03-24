var path = require('path');

function getLoaders(dirName, staticDir, production) {

    var includePathCss = [path.resolve(dirName, 'stylesheets_cr'), path.resolve(dirName, staticDir)];

    var htmlLoader = production ? 'raw!html-minify' : 'raw';
    var scssLoader = production ? ["style", "css", "sass"] : ["style", "css?sourceMap", "sass?sourceMap"];
        
    var loaders = [
        {
            test: /pagination\.html$/,
            loader: 'ngtemplate?relativeTo=angular!html',
            include: [path.resolve(dirName, staticDir)],
            exclude: [/node_modules/]
        },
        {
            test: /\.html$/,
            loader: htmlLoader,
            exclude: [/node_modules/, /pagination\.html$/, /widgetpart-icon\.html$/],
            include: [path.resolve(dirName, 'components'),
                path.resolve(dirName, staticDir)]
        },
        {
            test: /widgetpart-icon\.html$/,
            loader: 'raw',
            include: [path.resolve(path.resolve(dirName, staticDir) , 'angular/widgetpart/template/')]
        },
        {

            test: /\.(png|jpg|svg|ttf|eot|woff)$/,
            loader: 'url?limit=2500000',
            include: includePathCss,
            exclude: [/node_modules/]

        },
        {
            test: /\.scss$/,
            loaders: scssLoader,
            include: includePathCss,
            exclude: [/node_modules/]

        }, {
            test: /\.css$/,
            loaders: ["style", "css"],
            include: includePathCss,
            exclude: [/node_modules/]
        },
        // Hack pour Modernizr
        {
            test: /[\\\/]vendor[\\\/]modernizr[\\\/]modernizr\.js$/,
            loader: "imports?this=>window!exports?window.Modernizr",
            include: [/vendor/],
            exclude: [/node_modules/]
        }, {
            test: /[\\\/]vendor[\\\/]detectizr[\\\/]dist[\\\/]detectizr\.js$/,
            loader: "imports?this=>window!exports?window.Detectizr",
            include: [/vendor/],
            exclude: [/node_modules/]
        }];

    return loaders;
}

module.exports = getLoaders;