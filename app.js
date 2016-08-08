/**
 * Created by YouHan on 2016/8/3.
 */
var express = require('express');
var app = express();
var chart = require('./app/server/model/chart');
var event = require('./app/server/model/event');
var logger = require('./app/server/helper/logger');

app.get('/chart/:id?', function (req, res) {
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

app.post('/chart', function (req, res) {
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

app.patch('/chart/:id', function (req, res) {
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

app.delete('/chart/:id', function (req, res) {
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

/**
 * event
 */
app.get('/event/:id?', function (req, res) {
    var id;
    if (req.params) {
        id = req.params.id;
    }
    event.get(id).then(function (data) {
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

app.post('/event', function (req, res) {
    var params = req.params;
    event.add(params.sid, params.name).then(function (res) {
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

app.patch('/event/:id', function (req, res) {
    var params = req.params;
    event.update(params.id, params.sid, params.name).then(function (res) {
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

app.delete('/event/:id', function (req, res) {
    var params = req.params;
    event.remove(params.id).then(function (res) {
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

app.listen('3000', function () {
    logger.info('server start over!', __dirname);
});