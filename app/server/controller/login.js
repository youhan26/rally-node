/**
 * Created by YouHan on 2016/9/19.
 */
var express = require('express');
var path = require('path');
var router = express.Router();
var login = require('./../service/login');

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
    .post(function (req, res, next) {
        var params = req.body;
        login.login(params).then(function () {
            res.send({
                success: true
            });
        }, function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            });
        });
    });


module.exports = router;