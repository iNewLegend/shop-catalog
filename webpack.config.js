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
					        [ "@babel/plugin-transform-react-jsx", { "pragma": "new $flow.JsxElement" } ]
				        ]
			        }
		        }
	        },
        ]
    },
    resolve: {
	    extensions: ['.tsx', '.ts', '.js'],
    },
    stats: {
        colors: true
    },
};
