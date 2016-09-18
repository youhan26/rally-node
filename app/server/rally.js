***REMOVED***
 * Created by YouHan on 2016/8/9.
***REMOVED***
var express = require('express');
var router = express.Router();
var path = require('path');
var rally = require('./controller/rally/rally');
var mock = require('./utils/mock');

router.use('/', rally);

router.get('/home', function (req, res) {
    res.sendFile(path.resolve(__dirname + './../client/views/rally/home.html'));
***REMOVED***

router.get('login', function (req, res) {
    res.sendFile(path.resolve(__dirname + './../client/views/rally/login.html'));
***REMOVED***

router.get('/index', function (req, res) {
    res.sendFile(path.resolve(__dirname + './../client/views/rally.html'));
***REMOVED***

router.get('/dashboard/dataList', function (req, res) {
    res.send(mock.getDataList());
***REMOVED***

module.exports = router;