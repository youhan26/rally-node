***REMOVED***
 * Created by YouHan on 2016/8/5.
***REMOVED***
var express = require('express');
var chart = require('./../model/chart');
var authRouter = require('./../common/auth');
var router = express.Router();
//root path: /chart

// router.use(authRouter);

router.param('id', function (req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.params.id = id;
    next();
***REMOVED***


***REMOVED***
 *      /timeLine/chart/tree
***REMOVED***
router.get('/tree', function (req, res) {
    chart.get().then(function (data) {
        res.send({
            success: true,
            data: setTree(data)
        ***REMOVED***
    }).then(function () {
        res.send({
            success: false,
            reason: error || 'error happen'
        ***REMOVED***
    ***REMOVED***
***REMOVED***

***REMOVED***
 *      /timeLine/chart/:id?
***REMOVED***
router.route('/:id?')
    .all(function (req, res, next) {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        //TODO load data?
        next();
    })
    .get(function (req, res, next) {
        chart.get(req.params.id).then(function (data) {
            res.send({
                success: true,
                data: data
            ***REMOVED***
        }).then(function (reason) {
            res.send({
                success: false,
                reason: reason || 'error happen'
            ***REMOVED***
        ***REMOVED***
    })
    .patch(function (req, res, next) {
        var params = req.body;
        chart.update(params.id, params.pid, params.name).then(function () {
            res.send({
                success: true
            ***REMOVED***
        }).then(function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            ***REMOVED***
        ***REMOVED***
    })
    .post(function (req, res, next) {
        var params = req.body;
        chart.add(params.pid, params.name).then(function () {
            res.send({
                success: true
            ***REMOVED***
        }).then(function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            ***REMOVED***
        ***REMOVED***
    })
    .delete(function (req, res, next) {
        chart.remove(req.params.id).then(function () {
            res.send({
                success: true
            ***REMOVED***
        }).then(function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

function setTree(list) {
    var data = {};
    if (list && list.length > 0) {
        for (var i in list) {
            var temp = list[i];
            var obj = {
                pid: temp['parent_id'],
                id: temp.id,
                name: temp.name,
                children: []
            };
            data[obj.id] = obj;
            if (data[obj.pid]) {
                data[obj.pid].children.push(obj);
            }
        }
    }
    return data[1];
}

module.exports = router;