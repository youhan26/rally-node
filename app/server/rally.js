***REMOVED***
 * Created by YouHan on 2016/8/9.
***REMOVED***
var express = require('express');
var router = express.Router();
var path = require('path');
var project = require('./controller/project');
var team = require('./controller/team');
var role = require('./controller/role');
var member = require('./controller/member');

var tools = require('./controller/tools');

var mock = require('./utils/mock');

router.get('/home', function (req, res) {
    res.sendFile(path.resolve(__dirname + './../client/views/home.html'));
***REMOVED***

router.get('login', function (req, res) {
    res.sendFile(path.resolve(__dirname + './../client/views/login.html'));
***REMOVED***

router.get('/index', function (req, res) {
    res.sendFile(path.resolve(__dirname + './../client/views/rally.html'));
***REMOVED***

router.get('/dashboard/dataList', function (req, res) {
    res.send(mock.getDataList());
***REMOVED***

router.use('/tools', tools);
router.use('/project', project);
router.use('/team', team);
router.use('/role', role);
router.use('/member', member);


module.exports = router;