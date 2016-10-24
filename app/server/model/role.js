/**
 * Created by YouHan on 2016/9/19.
 */
/**
 * Created by YouHan on 2016/8/5.
 */
var builder = require('./../db/builder');
var logger = require('./../utils/logger');


//add function
exports.add = function (data) {
    return new Promise(function (resolver, rejector) {
        builder.insert('tbl_role', [{
            'name': data.name,
            'introduction': data.introduction,
            'create_time': new Date(),
            'update_time': new Date()
        }])
            .end()
            .then(function (res) {
                logger.info('insert to tbl_role', res, data);
                resolver(res);
            }, function (error) {
                logger.error('error happen when insert to tbl_role', error);
                rejector(error);
            });
    })
};


//get function
exports.get = function (id) {
    return new Promise(function (resolver, rejector) {
        builder.select('tbl_role')
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
            });
    });
};

exports.update = function (data) {
    return new Promise(function (resolver, rejector) {
        if (!data.id) {
            rejector('no id');
            return;
        }
        builder.update('tbl_role', {
            'name': data.name,
            'introduction': data.introduction,
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
            });
    });
};


//get all function
exports.getAll = function () {
    return new Promise(function (resolver, rejector) {
        builder.select('tbl_role')
            .orderBy(['id desc', 'create_time'])
            .end()
            .then(function (res) {
                logger.info('get success');
                resolver(res)
            }, function (error) {
                logger.error('error happen ', error);
                rejector(error);
            });
    })
};