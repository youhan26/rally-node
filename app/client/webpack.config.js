var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var utils = require('./tools/utils');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        timeLine: path.resolve(__dirname, 'config/timeLine/timeLine.js'),
        image: path.resolve(__dirname, 'config/timeLine/image.js'),
        rally: [path.resolve(__dirname, 'config/rally/rally.js')],
        basic: ['babel-polyfill', path.resolve(__dirname, 'config/timeLine/basic.js')]
    },
    output: {
        // path: path.join(__dirname, "/bundle", "[hash]"),
        path: path.join(__dirname, "/bundle"),
        // filename: "[name].bundle.[hash].js",
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules)/,
                loader: 'jsx-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: ['babel'],
                query: {
                    presets: ['es2015', 'react', 'stage-1']
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './views/timeLine.html'),
            template: path.resolve(__dirname, './views/timeLine/timeLine.html'),
            inject: 'body',
            hash: true,
            cache: true,
            chunks: ['basic', 'timeLine'],
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './views/rally.html'),
            template: path.resolve(__dirname, './views/rally/index.html'),
            inject: 'body',
            hash: true,
            cache: true,
            chunks: ['basic', 'rally'],
            chunksSortMode: 'dependency'
        })]
};