/* eslint-disable no-unused-vars */

var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [path.join(__dirname, 'server/react/app.js')],
    output: {
        path: path.join(__dirname, '/public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
