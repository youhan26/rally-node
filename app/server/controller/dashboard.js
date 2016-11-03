/**
 * Created by YouHan on 2016/9/19.
 */
var express = require('express');
var path = require('path');
var router = express.Router();
var dashboard = require('./../service/dashboard');
var common = require('./../common/common');

router.param('id', function (req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.params.id = id;
    next();
});


router.get('/getList', function (req, res) {
    var params = req.query;
    dashboard.getList(params)
        .then(function (data) {
            res.send({
                success: true,
                data: data
            });
        }, function (error) {
            common.sendError(res, error);
        })
        .catch(function (error) {
            common.sendError(res, error);
        });
});

module.exports = router;