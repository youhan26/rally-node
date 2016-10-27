/**
 * Created by YouHan on 2016/9/19.
 */
/**
 * Created by YouHan on 2016/8/5.
 */
var builder = require('./../db/builder');
var logger = require('./../utils/logger');


module.exports = {
    get: get,       //get project with release
    add: add,       //add basic project info
    update: update, //update basic project info
    getAll: getAll, //get all project info with release
    updateRelease: updateRelease
};


//add function
function add(data) {
    return builder.insert('tbl_project', [{
        'team_id': data.team_id,
        'name': data.name,
        'status': data.status,
        'release_interval': data.release_interval,
        'release_unit': data.release_unit,
        'create_time': new Date(),
        'update_time': new Date()
    }])
        .end();
}

function update(data) {
    return builder.update('tbl_project', {
        'team_id': data.team_id,
        'name': data.name,
        'status': data.status,
        'release_interval': data.release_interval,
        'release_unit': data.release_unit,
        'update_time': new Date()
    })
        .where({
            id: data.id
        })
        .end();
}

//get function
function get(id) {
    return builder.select('tbl_project')
        .where({
            id: id
        })
        .orderBy(['id desc', 'create_time'])
        .end();
}

function getAll() {
    var sql = 'SELECT t.*, mht.`id` AS `r_id` , mht.`number`, mht.`start_date`, mht.`end_date` ' +
        'FROM `tbl_project` t LEFT JOIN `tbl_release` mht ' +
        'ON t.`current_release_id` = mht.`id` ORDER BY t.`id`';
    return builder.run(sql).then(function (datas) {
        var results = [];
        datas.forEach(function (item) {
            var data = {
                id: item.id,
                team_id: item.team_id,
                name: item.name,
                status: item.status,
                current_release_id: item.current_release_id
            };
            if (item.r_id) {
                data.release = {
                    id: item.r_id,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    number: item.number
                };
            }
            results.push(data);
        });
        return results;
    });
}

function updateRelease(id, releaseId) {
    return builder
        .update('tbl_project', {
            'current_release_id': releaseId
        })
        .where({
            id: id
        })
        .end();
}