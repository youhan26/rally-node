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
        builder.insert('tbl_member', [{
            'name': data.name,
            'introduction': data.introduction,
            'team_id': data.team_id,
            'role_id': data.role_id,
            'create_time': new Date(),
            'update_time': new Date()
        }])
            .end()
            .then(function (res) {
                logger.info('insert to tbl_member', res, data);
                resolver(res);
            }, function (error) {
                logger.error('error happen when insert to tbl_member', error);
                rejector(error);
            });
    })
};


//get function
exports.get = function (id) {
    return new Promise(function (resolver, rejector) {
        builder.select('tbl_member')
            .where({
                id: id
            })
            .orderBy(['id desc', 'create_time'])
            .end()
            .then(function (res) {
                logger.info('get success from tbl_member', res, id);
                resolver(res);
            }, function (error) {
                logger.error('error happen get tbl_member', error, id);
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
        builder.update('tbl_member', {
            'name': data.name,
            'introduction': data.introduction,
            'team_id': data.team_id,
            'role_id': data.role_id,
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
        builder.select('tbl_member')
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

exports.updateTeam = function (members, team) {
    return new Promise(function (resolver, rejector) {
        builder.update('tbl_member', {
            'team_id': team
        }).where({
            id: members
        })
            .end()
            .then(function (res) {
                logger.info('update team  success', res);
                resolver(res)
            }, function (error) {
                logger.error('error happen update team', error);
                rejector(error);
            });
    });
};