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
            });
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
            });
    });
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
            });
    });
};


//get all function
exports.getAll = function () {
    var sql = 'SELECT t.*, mht.`member_id` ' +
        'FROM `tbl_team` t LEFT JOIN `tbl_member_has_team` mht ON t.`id` = mht.`team_id` ' +
        'ORDER BY t.`create_time` DESC';
    return builder.run(sql).then(function (datas) {
        var temp = {};
        var results = [];
        if (datas && datas.length > 0) {
            for (var i = 0; i < datas.length; i++) {
                var item = datas[i];
                var id = item.id;
                if (temp[id] === undefined) {
                    temp[id] = {
                        id: item.id,
                        name: item.name,
                        desc: item.desc,
                        create_time: item.create_time,
                        update_time: item.update_time,
                        memberIds: []
                    };
                }
                if (item.member_id != null) {
                    temp[id].memberIds.push(item.member_id);
                }
            }
        }
        for (var key in temp) {
            results.push(temp[key]);
        }
        return results;
    });
};