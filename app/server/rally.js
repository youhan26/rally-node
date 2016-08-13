***REMOVED***
 * Created by YouHan on 2016/8/9.
***REMOVED***
var express = require('express');
var router = express.Router();
// var chart = require('./controller/chart');
// var event = require('./controller/event');
//
// router.use('/chart', chart);
// router.use('/event', event);
//
// router.get('/', function (req, res) {
//     res.sendfile(path.resolve(__dirname + './../client/views/timeLine.html'));
// ***REMOVED***
router.get('/', function (req, res) {
    res.send('rally page');
***REMOVED***

module.exports = router;
