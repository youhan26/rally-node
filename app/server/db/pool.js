***REMOVED***
 * Created by YouHan on 2016/8/4.
***REMOVED***
var mysql = require('mysql');
var logger = require('./../helper/logger');

logger.info('start create db tool', __dirname);

var pool = mysql.createPool({
    host: 'localhost',
***REMOVED***
***REMOVED***
    user: 'root',
    password: '123456',
    connectionLimit: 10
***REMOVED***

pool.on('enqueue', function () {
    logger.info('Waiting for available connection slot', __dirname);
***REMOVED***

// pool.end(function (err) {
//     if (err) {
//         logger.error('error happen when pool end');
//     }
// ***REMOVED***

module.exports = pool;