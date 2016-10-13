***REMOVED***
 * Created by YouHan on 2016/9/19.
***REMOVED***
***REMOVED***
 * Created by YouHan on 2016/8/5.
***REMOVED***
var builder = require('./../db/builder');
var cons = require('./../utils/constant');
var logger = require('./../utils/logger');


//add function
exports.add = function (data) {
    return new Promise(function (resolver, rejector) {
        builder.insert('tbl_team', [{
            'name': data.name,
            'desc': data.desc,
            'create_time': new Date(),
            'update_time': new Date()
        }])
            .end()
            .then(function (res) {
                logger.info('insert to tbl_team', res, data);
                resolver(res);
            }, function (error) {
                logger.error('error happen when insert to tbl_team', error);
                rejector(error);
            ***REMOVED***
    })
};


//get function
exports.get = function (id) {
    return new Promise(function (resolver, rejector) {
        builder.select('tbl_team')
            .where({
                id: id
            })
            .orderBy(['id desc', 'create_time'])
            .end()
            .then(function (res) {
                logger.info('get success ', res, id);
                resolver(res);
            }, function (error) {
                logger.error('error happen get project', error, id);
                rejector(error);
            ***REMOVED***
    ***REMOVED***
};

exports.update = function (data) {
    return new Promise(function (resolver, rejector) {
        if (!data.id) {
            rejector('no id');
            return;
        }
        builder.update('tbl_team', {
            'name': data.name,
            'desc': data.desc,
            'create_time': new Date(),
            'update_time': new Date()
        })
            .where({
                id: data.id
            })
            .end()
            .then(function (res) {
                logger.info('update success ', res);
                resolver(res);
            }, function (error) {
                logger.error('error happen update project', error);
                rejector(error);
            ***REMOVED***
    ***REMOVED***
};


//get all function
exports.getAll = function () {
    return new Promise(function (resolver, rejector) {
        builder.select('tbl_team')
            .orderBy(['id desc', 'create_time'])
            .end()
            .then(function (res) {
                logger.info('get success');
                resolver(res)
            }, function (error) {
                logger.error('error happen ', error);
                rejector(error);
            ***REMOVED***
    })
};