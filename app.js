/**
 * Created by YouHan on 2016/8/3.
 */
var express = require('express');
var app = express();
var rally = require('./app/server/rally');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./app/client/webpack.config.js');

var compiler = webpack(webpackDevConfig);

// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));


/**
 * body parser
 */
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

/**
 * cookie parser
 */
app.use(cookieParser());

/**
 * static files
 */
app.use(express.static(__dirname + '/app/client'));

/**
 * dispatch route
 */
app.use('/', rally);

http.createServer(app).listen(3000, "0.0.0.0");