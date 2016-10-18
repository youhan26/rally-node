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
    return builder.insert('tbl_project', [{
        'team_id': data.team_id,
        'name': data.name,
        'status': data.status,
        // 'current_release_id': data.crrent_releaseId,
        'release_interval': data.release_interval,
        'release_unit': data.release_unit,
        'create_time': new Date(),
        'update_time': new Date()
    }])
        .end();
};


//get function
exports.get = function (id) {
    return builder.select('tbl_project')
        .where({
            id: id
        })
        .orderBy(['id desc', 'create_time'])
        .end();
};


//get all function
exports.getAll = function () {
    return builder.select('tbl_project')
        .orderBy(['id desc', 'create_time'])
        .end();
};

exports.update = function (data) {
    return builder.update('tbl_project', {
        'team_id': data.team_id,
        'name': data.name,
        'status': data.status,
        // 'current_release_id': data.crrent_releaseId,
        'release_interval': data.release_interval,
        'release_unit': data.release_unit,
        'update_time': new Date()
    })
        .select({
            id: data.id
        })
        .end();
};