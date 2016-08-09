***REMOVED***
 * Created by YouHan on 2016/8/3.
***REMOVED***
var express = require('express');
var app = express();
var chart = require('./app/server/controller/chart');
var event = require('./app/server/controller/event');
var logger = require('./app/server/helper/logger');

app.use('/chart', chart);
app.use('/event', event);

app.listen('3000', function () {
    logger.info('server start over!', __dirname);
***REMOVED***