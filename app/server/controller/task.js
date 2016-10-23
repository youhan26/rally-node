***REMOVED***
 * Created by YouHan on 2016/9/19.
***REMOVED***
var express = require('express');
var path = require('path');
var router = express.Router();
var role = require('./../service/task');
var convertor = require('./../convertor/task');
var common = require('./../common/common');

router.param('id', function (req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.params.id = id;
    next();
***REMOVED***


router.get('/all', function (req, res) {
    role.getAll().then(function (data) {
        var result = [];
        if (data && data.length > 0) {
            data.forEach(function (item) {
                result.push(convertor.changeToVO(item));
            ***REMOVED***
        }
        res.send({
            success: true,
            data: result
        ***REMOVED***
    }, function (error) {
        common.sendError(res, error);
    }).catch(function (error) {
        common.sendError(res, error);
    ***REMOVED***

***REMOVED***

***REMOVED***
 *      /project/:id?
***REMOVED***
router.route('/:id?')
    .all(function (req, res, next) {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        //TODO load data?
        next();
    })
    .get(function (req, res, next) {
        role.get(req.params.id).then(function (data) {
            res.send({
                success: true,
                data: convertor.changeToVO(data)
            ***REMOVED***
        }, function (error) {
            common.sendError(res, error);
        }).catch(function (error) {
            common.sendError(res, error);
        ***REMOVED***
    })
    .post(function (req, res, next) {
        var params = req.body;
        role.add(convertor.changeToBO(params)).then(function () {
            res.send({
                success: true
            ***REMOVED***
        }, function (error) {
            common.sendError(res, error);
        }).catch(function (error) {
            common.sendError(res, error);
        ***REMOVED***
    })
    .patch(function (req, res, next) {
        var params = req.body;
        role.update(convertor.changeToBO(params)).then(function () {
            res.send({
                success: true
            ***REMOVED***
        }, function (error) {
            common.sendError(res, error);
        }).catch(function (error) {
            common.sendError(res, error);
        ***REMOVED***
    ***REMOVED***

module.exports = router;