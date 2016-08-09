/**
 * Created by YouHan on 2016/8/4.
 */
var mysql = require('mysql');
var logger = require('./../utils/logger');

logger.info('start create db tool', __dirname);

var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'rally',
    user: 'root',
    password: '123456',
    connectionLimit: 10
});

pool.on('enqueue', function () {
    logger.info('Waiting for available connection slot', __dirname);
});

// pool.end(function (err) {
//     if (err) {
//         logger.error('error happen when pool end');
//     }
// });

module.exports = pool;