const path = require('path');

module.exports = {
	watch: true,
	devServer: {
		compress: true,
		contentBase: path.join(__dirname, 'frontend'),
	},
	entry: {
        app: './frontend/app.js'
    },
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'frontend/')
    },
    module: {
        rules: [
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
            }
          ]

    },
	resolve: {
		alias: {
			'API': path.resolve(__dirname, 'frontend/api'),
			'COMPONENTS': path.resolve(__dirname, 'frontend/components'),
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
