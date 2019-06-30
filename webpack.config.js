var path = require('path');

module.exports = {
    entry: {
        app: './index.js'
    },
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'js/dist')
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
    stats: {
        colors: true
    },
};
