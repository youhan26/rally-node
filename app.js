/**
 * Created by YouHan on 2016/8/3.
 */
var express = require('express');
var app = express();
var rally = require('./app/server/rally');
var http = require('http');
var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var helmet = require('helmet');

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

//use gzip compression--生产环境中应放置在反向代理环节
app.use(compression());


app.use(helmet());

/**
 * body parser
 */
/**
 * change the max request limit
 */
app.use(bodyParser.json({
    limit: '50mb'
})); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
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

http.createServer(app).listen(9999, "0.0.0.0");
// const options = {
//     key: fs.readFileSync('./key/key.pem'),
//     cert: fs.readFileSync('./key/cert.pem')
// };
//
// https.createServer(options, app).listen(9001, '0.0.0.0');
