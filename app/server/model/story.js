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
    add: add,
    get: get,
    update: update,
    getList: getList,
    getSelectList: getSelectList
};

function getList(obj) {
    var sql = 'SELECT story.*, SUM(task.`todo`) AS todo, SUM(task.`est`) AS est ' +
        'FROM tbl_story story LEFT JOIN tbl_task task ' +
        'ON task.`story_id` = story.`id` ';
    if (obj) {

        var temp = [];
        Object.keys(obj).forEach(function (item) {
            if (obj[item]) {
                if (item == 'title') {
                    temp.push(' story.`' + item + '` like ' + mysql.escape('%' + obj[item] + '%') + ' ');
                } else {
                    temp.push(' story.`' + item + '` = ' + mysql.escape(obj[item]) + ' ');
                }
            }
        });
        if (temp.length >= 1) {
            sql += ' where ';
        }
        sql += temp.join(' AND ');
    }
    sql += 'GROUP BY story.`id`;';
    console.log(sql);
    return builder.run(sql);
}

function getSelectList() {
    var sql = 'SELECT `title`, `id` FROM `tbl_story` ORDER BY `id`';
    return builder.run(sql);
}

function get(id) {
    var sql = 'SELECT s.`id`, s.`title`, s.`desc`, s.`notes`, s.`files`, s.`status`, s.`plan_est`, ' +
        'SUM(t.`todo`) AS todo, SUM(t.`est`) AS task_est, ' +
        's.`start_date`, s.`end_date`, s.`qa`, s.`pm`, s.`fe`, ' +
        's.`rd`, s.`owner_id`, s.`release_id`, s.`project_id`, s.`pid` ' +
        'FROM tbl_story s LEFT JOIN tbl_task t ON s.`id` = t.`story_id` where s.`id` = ' + mysql.escape(id);
    return builder.run(sql);
}

function update(data) {
    return builder.update('tbl_story', {
        title: data.title,
        desc: data.desc,
        notes: data.notes,
        //files : data.files
        status: data.status,
        plan_est: data.plan_est,
        start_date: data.start_date,
        end_date: data.end_date,
        qa: data.qa,
        pm: data.pm,
        fe: data.fe,
        rd: data.rd,
        owner_id: data.owner_id,
        release_id: data.release_id,
        project_id: data.project_id,
        pid: data.pid
    })
        .where({
            id: data.id
        }).end();
}

function add(data) {
    return builder.insert('tbl_story', {
        title: data.title,
        desc: data.desc,
        notes: data.notes,
        //files : data.files
        status: data.status,
        plan_est: data.plan_est,
        start_date: data.start_date,
        end_date: data.end_date,
        qa: data.qa,
        pm: data.pm,
        fe: data.fe,
        rd: data.rd,
        owner_id: data.owner_id,
        release_id: data.release_id,
        project_id: data.project_id,
        pid: data.pid,
        create_time: new Date(),
        update_time: new Date()
    })
        .end();
}