const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	watch: true,
	entry: {
        app: './frontend/app.js',
        mvc: './dev/mvc/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'frontend/dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
              }
            },
          ]
    },
	resolve: {
    		// TODO: Read jsconfig.json for aliases.
		alias: {
			'API': path.resolve(__dirname, 'frontend/api'),
			'COMPONENTS': path.resolve(__dirname, 'frontend/components'),
            		'CORE': path.resolve(__dirname, 'frontend/core'),
			'LIBRARY': path.resolve(__dirname, 'frontend/library'),
			'MODULES': path.resolve(__dirname, 'frontend/modules'),
			'PAGES': path.resolve(__dirname, 'frontend/pages'),
			'SERVICES': path.resolve(__dirname, 'frontend/services'),
			'DEV-LIBRARY': path.resolve(__dirname, 'dev/library'),
			'DEV-MODULES': path.resolve(__dirname, 'dev/modules'),
		}
	},
    stats: {
        colors: true
    },
};
