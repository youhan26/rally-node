/**
 * Created by YouHan on 2016/8/5.
 */
var express = require('express');
var chart = require('./../model/chart');
var router = express.Router();

//root path: /chart

router.get('/:id?', function (req, res) {
    var id;
    if (req.params) {
        id = req.params.id;
    }
    chart.get(id).then(function (data) {
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
});

router.post('/', function (req, res) {
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
});

router.patch('/:id', function (req, res) {
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
});

router.delete('/:id', function (req, res) {
    var params = req.params;
    chart.remove(params.id).then(function (res) {
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