/**
 * Created by YouHan on 2016/8/19.
 */
var Builder = require('mysql-orm-builder').orm;


var builder = new Builder({
    host: 'IP',
    port: 3306,
    database: 'rally',
    user: 'user',
    password: 'password',
    connectionLimit: 10,
    dateStrings: true,
    supportBigNumbers: true, //enable big number
    bigNumberStrings: true
});

module.exports = builder;
