***REMOVED***
 * Created by YouHan on 2016/8/4.
***REMOVED***
var mysql = require('mysql');
var logger = require('./../utils/logger');

logger.info('start create db tool', __dirname);

var pool = mysql.createPool({
    host: '52.196.207.191',
***REMOVED***
***REMOVED***
    user: 'youto',
    password: '123456',
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

pool.on('enqueue', function () {
    logger.info('Waiting for available connection slot', __dirname);
***REMOVED***

module.exports = pool;