***REMOVED***
 * Created by YouHan on 2016/9/19.
***REMOVED***
var express = require('express');
var path = require('path');
var router = express.Router();
var team = require('./../service/team');
var Member = require('./../service/member');

router.param('id', function (req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.params.id = id;
    next();
***REMOVED***


router.get('/all', function (req, res) {
    team.getAll().then(function (data) {
        res.send({
            success: true,
            data: data
        ***REMOVED***
    }, function (error) {
        res.send({
            success: false,
            reason: error || 'error happen'
        ***REMOVED***
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
        team.get(req.params.id).then(function (data) {
            res.send({
                success: true,
                data: data
            ***REMOVED***
        }, function (reason) {
            res.send({
                success: false,
                reason: reason || 'error happen'
            ***REMOVED***
        ***REMOVED***
    })
    .post(function (req, res, next) {
        var params = req.body;
        team.add(params).then(function (data) {
            if (params.memberIds && data.insertId) {
                Member.updateTeam(params.memberIds, data.insertId).then(function (data2) {
                    res.send({
                        success: true,
                        data: data
                    ***REMOVED***
                })
            }
        }, function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            ***REMOVED***
        ***REMOVED***
    })
    .patch(function (req, res, next) {
        var params = req.body;
        team.update(params).then(function (data) {
            Member.updateTeam(params.memberIds, params.id).then(function () {
                res.send({
                    success: true,
                    data: data
                ***REMOVED***
            ***REMOVED***
        }, function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

module.exports = router;