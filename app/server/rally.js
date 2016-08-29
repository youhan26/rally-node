/**
 * Created by YouHan on 2016/8/9.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var rally = require('./controller/rally/rally');

router.get('/home', function (req, res) {
    res.sendFile(path.resolve(__dirname + './../client/views/rally/home.html'));
});

router.get('login', function (req, res) {
    res.sendFile(path.resolve(__dirname + './../client/views/rally/login.html'));
});

router.get('/index', function (req, res) {
    res.sendfile(path.resolve(__dirname + './../client/views/rally/index.html'));
});
router.get('/', function (req, res) {
    res.send('rally page');
});

module.exports = router;
