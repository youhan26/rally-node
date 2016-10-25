/**
 * Created by YouHan on 2016/8/9.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var project = require('./controller/project');
var team = require('./controller/team');
var role = require('./controller/role');
var member = require('./controller/member');
var task = require('./controller/task');
var defect = require('./controller/defect');
var release = require('./controller/release');

var tools = require('./controller/tools');

var mock = require('./utils/mock');

router.get('/home', function (req, res) {
    res.sendFile(path.resolve(__dirname + './../client/views/home.html'));
});

router.get('login', function (req, res) {
    res.sendFile(path.resolve(__dirname + './../client/views/login.html'));
});

router.get('/index', function (req, res) {
    res.sendFile(path.resolve(__dirname + './../client/views/rally.html'));
});

router.get('/dashboard/dataList', function (req, res) {
    res.send(mock.getDataList());
});

router.use('/tools', tools);
router.use('/project', project);
router.use('/team', team);
router.use('/role', role);
router.use('/member', member);
router.use('/task', task);
router.use('/defect', defect);
router.use('/release', release);


module.exports = router;