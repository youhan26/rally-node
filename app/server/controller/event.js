***REMOVED***
 * Created by YouHan on 2016/8/5.
***REMOVED***
var express = require('express');
var event = require('./../model/event');
var router = express.Router();

//root path:/event

router.get('/:id?', function (req, res) {
    var id;
    if (req.params) {
        id = req.params.id;
    }
    event.get(id).then(function (data) {
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
***REMOVED***

router.post('/', function (req, res) {
    var params = req.params;
    event.add(params.sid, params.name).then(function (res) {
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

router.patch('/:id', function (req, res) {
    var params = req.params;
    event.update(params.id, params.sid, params.name).then(function (res) {
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

router.delete('/:id', function (req, res) {
    var params = req.params;
    event.remove(params.id).then(function (res) {
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

module.exports = router;