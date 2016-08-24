var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var utils = require('./tools/utils');


module.exports = {
    entry: {
        basic: './config/timeLine/basic.js',
        timeLine: './config/timeLine/timeLine.js',
        image: './config/timeLine/image.js',
        rally: './config/rally/rally.js'
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
                test: /\.js$/,
                loader: 'jsx-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: ['babel'],
                query: {
                    presets: ['es2015', 'react']
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