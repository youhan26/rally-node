/**
 * Created by YouHan on 2016/8/19.
 */
var Builder = require('mysql-orm-builder').orm;


var builder = new Builder({
    host: '192.168.0.124',
    port: 3306,
    database: 'rally2',
    user: 'work',
    password: '123456',
    connectionLimit: 10,
    dateStrings: true,
    supportBigNumbers: true, //enable big number
    bigNumberStrings: true
});

module.exports = builder;
