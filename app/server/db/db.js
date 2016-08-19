***REMOVED***
***REMOVED***
***REMOVED***
var Dao = require('mysql-orm-builder').dao;
var config = {
  host: '52.196.207.191',
  port: 3306,
  database: 'rally',
  user: 'youto',
  password: '123456',
  connectionLimit: 10,
  dateStrings: true,
  supportBigNumbers: true, //enable big number
  bigNumberStrings: true
};


var dao = new Dao(config);

module.exports = dao;