***REMOVED***
 * Created by YouHan on 2016/8/3.
***REMOVED***
var express = require('express');
var app = express();
var rally = require('./app/server/rally');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

***REMOVED***
 * body parser
***REMOVED***
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

***REMOVED***
 * cookie parser
***REMOVED***
app.use(cookieParser());

***REMOVED***
 * static files
***REMOVED***
app.use(express.static(__dirname + '/app/client'));

***REMOVED***
 * dispatch route
***REMOVED***
app.use('/', rally);

http.createServer(app).listen(3000, "0.0.0.0");