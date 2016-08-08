/**
 * Created by YouHan on 2016/8/3.
 */
var express = require('express');
var app = express();
var chart = require('./app/server/model/chart');
var logger = require('./app/server/helper/logger');

app.get('/chart', function (req, res) {
    chart.get().then(function (data) {
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

app.listen('3000', function () {
    logger.info('server start over!', __dirname);
});