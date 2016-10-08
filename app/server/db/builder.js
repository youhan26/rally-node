/**
 * Created by YouHan on 2016/8/19.
 */
var Builder = require('mysql-orm-builder').orm;


var builder = new Builder({
    host: '45.32.53.48',
    port: 3306,
    database: 'rally',
    user: 'youhan',
    password: 'youhan',
    connectionLimit: 10,
    dateStrings: true,
    supportBigNumbers: true, //enable big number
    bigNumberStrings: true
});

module.exports = builder;