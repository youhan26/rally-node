/**
 * Created by YouHan on 2016/8/3.
 */
var express = require('express');
var app = express();
var timeLine = require('./app/server/timeLine');
var rally = require('./app/server/rally');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

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
app.use('/timeLine', timeLine);
app.use('/rally', rally);

app.get('/', function (req, res) {
    res.send('new world');
});

http.createServer(app).listen(3000, "0.0.0.0");