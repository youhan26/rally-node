***REMOVED***
 * Created by YouHan on 2016/8/3.
***REMOVED***
var express = require('express');
var app = express();
var chart = require('./app/server/controller/chart');
var event = require('./app/server/controller/event');
var logger = require('./app/server/utils/logger');
var http = require('http');
// var fs = require('fs');
// var https = require('https');

app.use(express.static(__dirname + '/app/client'));

app.use('/chart', chart);
app.use('/event', event);

//TODO generate pem file
// var options = {
//     key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//     cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
// };

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/app/client/views/application.html');
***REMOVED***

http.createServer(app).listen(3000);
// https.createServer(options, app).listen(443);
