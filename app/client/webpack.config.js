var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var utils = require('./tools/utils');
var webpack = require('webpack');

module.exports = {
    entry: {
        basic: ['babel-polyfill', path.resolve(__dirname, 'config/timeLine/basic.js')],
        timeLine: path.resolve(__dirname, 'config/timeLine/timeLine.js'),
        image: path.resolve(__dirname, 'config/timeLine/image.js'),
        rally: [path.resolve(__dirname, 'config/rally/rally.js')]
    },
    output: {
        // path: path.join(__dirname, "/bundle", "[hash]"),
        path: path.join(__dirname, "/bundle"),
        filename: "[name].bundle.[hash].js",
        chunkFilename: "[id].bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                loader: 'jsx-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: ['babel', 'eslint-loader'],
                query: {
                    presets: ['es2015', 'react', 'stage-1']
                }
            }
        ]
    },
    plugins: [
        function () {
            this.plugin('compile', function () {
                utils.deleteFolderRecursive(path.resolve(__dirname + '/bundle'));
            ***REMOVED***
            this.plugin("done", function (stats) {
                var timeLine = path.resolve(__dirname, './views/timeLine/timeLine.html');
                var rally = path.resolve(__dirname, './views/rally/index.html');

                utils.updateFile([timeLine, rally], stats);
            ***REMOVED***
        }]
};