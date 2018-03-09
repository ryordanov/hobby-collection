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
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader', // ?cacheDirectory=true
                        options: {
                            presets: [/*'es2015'*/ 'env', 'react'/* ,'babel-preset-stage-1' */],
                            cacheDirectory: true
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
