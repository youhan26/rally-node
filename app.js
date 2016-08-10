/**
 * Created by YouHan on 2016/8/3.
 */
var express = require('express');
var app = express();
var timeLine = require('./app/server/timeLine');
var rally = require('./app/server/rally');
var http = require('http');

app.use(express.static(__dirname + '/app/client'));
app.use('/timeLine', timeLine);
app.use('/rally', rally);

app.get('/', function (req, res) {
    res.send('new world');
});

http.createServer(app).listen(3000);