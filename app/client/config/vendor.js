/**
 * Created by YouHan on 2016/9/18.
 */
var path = require("path");
var webpack = require("webpack");

var vendors = [
  'react',
  'react-dom',
  'react-router',
  'react-motion'
];

module.exports = {
  entry: {
    "lib": vendors,
  },
  output: {
    path: path.resolve(__dirname, '../bundle'),
    filename: "vendor.js",
    library: "vendor"
  },
  devtool: 'eval',
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../bundle/vendor-manifest.json'),
      name: "vendor",
      context: path.resolve(__dirname, 'bundle')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
};

