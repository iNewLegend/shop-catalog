const path = require( 'path' );

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    watch: true,
    entry: {
        app: './frontend/app.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve( __dirname, 'frontend/dist' )
    },
	devServer: {
		contentBase: 'frontend/dist'
	},
	module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
	        {
		        test: /\.(ts|js)x?$/,
		        exclude: /node_modules/,
		        use: {
			        loader: 'babel-loader',
			        options: {
				        presets: [
				        	'@babel/preset-env',
					        '@babel/preset-typescript'
				        ],
				        plugins: [
				        	[ '@babel/plugin-proposal-object-rest-spread' ],
					        [ "@babel/plugin-transform-react-jsx", { "pragma": "new $core.JsxElement" } ]
				        ]
			        }
		        }
	        },
        ]
    },
    resolve: {
	    extensions: ['.tsx', '.ts', '.js'],

	    // TODO: Read jsconfig.json for aliases.
        alias: {
            'API': path.resolve( __dirname, 'frontend/api' ),
            'COMPONENTS': path.resolve( __dirname, 'frontend/components' ),
            'CORE': path.resolve( __dirname, 'frontend/core' ),
            'LIBRARY': path.resolve( __dirname, 'frontend/library' ),
            'MODULES': path.resolve( __dirname, 'frontend/modules' ),
            'PAGES': path.resolve( __dirname, 'frontend/pages' ),
            'SERVICES': path.resolve( __dirname, 'frontend/services' ),
            'DEV-LIBRARY': path.resolve( __dirname, 'dev/library' ),
            'DEV-MODULES': path.resolve( __dirname, 'dev/modules' ),
        }
    },
    stats: {
        colors: true
    },
};
