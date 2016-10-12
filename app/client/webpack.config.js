var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        rally: ['babel-polyfill',
            path.resolve(__dirname, 'config/rally.js'),
            'webpack-hot-middleware/client?reload=true',
            // 'webpack/hot/dev-server'
        ]
    },
    output: {
        // path: path.join(__dirname, "/bundle", "[hash]"),
        // filename: "[name].bundle.[hash].js",
        publicPath: "http://localhost:3000/bundle",
        path: path.join(__dirname, "/bundle"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js",
        pathinfo: true
    },
    //enable sourceMap
    devtool: 'eval-source-map',
    // devtool: 'eval',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: 'jsx-loader'
            }, {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     mangle: {
        //         except: ['_', '$', 'exports', 'require', 'module']
        //     }
        // }),
        //Typically you'd have plenty of other plugins here as well
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, 'bundle'),
            manifest: require('./bundle/vendor-manifest.json'),
        }),
        // new HtmlWebpackPlugin({
        //     filename: path.resolve(__dirname, './views/timeLine.html'),
        //     template: path.resolve(__dirname, './views/timeLine/timeLine.html'),
        //     inject: 'body',
        //     hash: true,
        //     cache: true,
        //     chunks: ['timeLine'],
        //     chunksSortMode: 'dependency'
        // }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './views/rally.html'),
            template: path.resolve(__dirname, './views/index.html'),
            inject: 'body',
            hash: true,
            cache: true,
            chunks: ['rally'],
            chunksSortMode: 'dependency'
        })]
};