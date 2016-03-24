var webpack = require('webpack');

function getPlugins() {
	
	// les vendors doivent être accessible partout
	var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: Infinity
	});
		
	//Chargement des locales FR uniquement	
	var ContextReplacementPlugin = new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr.js/);
	
	// Expositions des variables globales
	var providePlugin = new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery",
		"window.jQuery": "jquery",
		moment: 'moment',
		Modernizr: 'modernizr',
		modernizr: 'modernizr',
		"window.Modernizr": 'modernizr',
		Detectizr: 'detectizr',
	});

	return [commonsChunkPlugin, ContextReplacementPlugin, providePlugin];

}

module.exports = getPlugins;