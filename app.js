***REMOVED***
 * Created by YouHan on 2016/8/3.
***REMOVED***
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
        ***REMOVED***
    }).then(function (reason) {
        res.send({
            success: false,
            reason: reason || 'error happen'
        ***REMOVED***
    ***REMOVED***
***REMOVED***

app.post('/chart', function (req, res) {
    var params = req.params;
    chart.add(params.pid, params.name).then(function (res) {
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

app.patch('/chart/:id', function (req, res) {
    var params = req.params;
    chart.update(params.id, params.pid, params.name).then(function (res) {
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

app.delete('/chart/:id', function (req, res) {
    var params = req.params;
    chart.remove(params.id).then(function (res) {
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

***REMOVED***
 * event
***REMOVED***
app.get('/event/:id?', function (req, res) {
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

app.post('/event', function (req, res) {
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

app.patch('/event/:id', function (req, res) {
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

app.delete('/event/:id', function (req, res) {
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

app.listen('3000', function () {
    logger.info('server start over!', __dirname);
***REMOVED***