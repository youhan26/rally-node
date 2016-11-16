var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    rally: ['babel-polyfill', path.resolve(__dirname, 'config/rally.js')]
  },
  output: {
    path: path.join(__dirname, "/bundle"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js",
  },
  devtool: 'eval',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    noParse: [
      path.resolve(__dirname, './node_modules/quill/dist/quill.js')
    ],
    loaders: [
      {
        test: /\.jsx$/,
        exclude: path.resolve(__dirname, './node_modules/'),
        loader: 'jsx-loader'
      }, {
        test: /\.js|jsx$/,
        exclude: path.resolve(__dirname, './node_modules/'),
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, 'bundle'),
      manifest: require('./bundle/vendor-manifest.json'),
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['_', '$', 'exports', 'require', 'module']
      }
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './views/rally.html'),
      template: path.resolve(__dirname, './views/index.html'),
      inject: 'body',
      hash: true,
      cache: true,
      chunks: ['rally'],
      chunksSortMode: 'dependency'
    }),
  ]
};