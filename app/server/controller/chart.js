/**
 * Created by YouHan on 2016/8/5.
 */
var express = require('express');
var chart = require('./../model/chart');
var authRouter = require('./../common/auth');
var router = express.Router();

//root path: /chart

router.use(authRouter);

router.param('id', function (req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.params.id = id;
    next();
});

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
            });
        }).then(function (reason) {
            res.send({
                success: false,
                reason: reason || 'error happen'
            });
        });
    })
    .patch(function (req, res, next) {
        var params = req.params;
        chart.update(params.id, params.pid, params.name).then(function (res) {
            res.send({
                success: true
            });
        }).then(function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            });
        });
    })
    .post(function (req, res, next) {
        var params = req.params;
        chart.add(params.pid, params.name).then(function (res) {
            res.send({
                success: true
            });
        }).then(function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            });
        });
    })
    .delete(function (req, res, next) {
        chart.remove(req.params.id).then(function (res) {
            res.send({
                success: true
            });
        }).then(function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            });
        });
    });


module.exports = router;