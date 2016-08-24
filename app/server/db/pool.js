/**
 * Created by YouHan on 2016/8/4.
 */
var mysql = require('mysql');
var logger = require('./../utils/logger');

logger.info('start create db tool', __dirname);

var pool = mysql.createPool({
    host: '52.196.207.191',
    port: 3306,
    database: 'rally',
    user: 'youto',
    password: '123456',
    connectionLimit: 10,
    dateStrings: true,
    supportBigNumbers: true, //enable big number
    bigNumberStrings: true
});

pool.on('enqueue', function () {
    logger.info('Waiting for available connection slot', __dirname);
});

module.exports = pool;