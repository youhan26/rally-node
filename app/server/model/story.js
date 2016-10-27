/**
 * Created by YouHan on 2016/9/19.
 */
/**
 * Created by YouHan on 2016/8/5.
 */
var builder = require('./../db/builder');
var logger = require('./../utils/logger');
var mysql = require('mysql');


module.exports = {
    get: get,
};

//get function
function get(id) {
    var sql = 'SELECT s.`id`, s.`title`, s.`desc`, s.`notes`, s.`files`, s.`status`, s.`plan_est`, ' +
        'SUM(t.`todo`) AS todo, SUM(t.`est`) AS task_est, ' +
        's.`start_date`, s.`end_date`, s.`qa`, s.`pm`, s.`fe`, ' +
        's.`rd`, s.`owner_id`, s.`release_id`, s.`project_id`, s.`pid` ' +
        'FROM tbl_story s LEFT JOIN tbl_task t ON s.`id` = t.`story_id` where s.`id` = ' + mysql.escape(id);
    return builder.run(sql);
}


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



function getAll() {

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