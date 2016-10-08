/**
 * Created by YouHan on 2016/9/19.
 */
/**
 * Created by YouHan on 2016/8/5.
 */
var mysql = require('mysql');
var builder = require('./../db/builder');
var cons = require('./../utils/constant');
var logger = require('./../utils/logger');


//add function
exports.add = function (data) {
    return new Promise(function (resolver, rejector) {
        if (!data || !data.teamId) {
            logger.info('error happen when insert to tbl_project', 'no team id');
            rejector('no team id');
            return;
        }


        builder.insert('tbl_project', [{
            'team_id': data.teamId,
            'name': data.name,
            'status': cons.project.status.normal,
            'current_release_id': data.crrentReleaseId,
            'release_interval': data.releaseInterval,
            'release_unit': data.releaseUnit,
            'create_time': new Date(),
            'update_time': new Date()
        }])
            .end()
            .then(function (res) {
                logger.info('insert to tbl_project', res, data);
                resolver(res);
            }, function (error) {
                logger.error('error happen when insert to tbl_project', error);
                rejector(error);
            });
    })
};


//get function
exports.get = function (id) {
    return new Promise(function (resolver, rejector) {
        builder.select('tbl_project')
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