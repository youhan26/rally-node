/**
 * Created by YouHan on 2016/9/19.
 */
/**
 * Created by YouHan on 2016/8/5.
 */
var builder = require('./../db/builder');
var logger = require('./../utils/logger');
var mysql = require('mysql');
var taskDao = require('./task');
var defectDao = require('./defect');


module.exports = {
    getList: getList
};

function getList(condition) {
    var sql = 'SELECT story.*, SUM(task.`todo`) AS todo, SUM(task.`est`) AS est ' +
        'FROM tbl_story story LEFT JOIN tbl_task task ' +
        'ON task.`story_id` = story.`id` ';
    if (condition) {
        var temp = [];
        Object.keys(condition).forEach(function (item) {
            if (condition[item]) {
                temp.push(' story.`' + item + '` = ' + mysql.escape(condition[item]) + ' ');
            }
        });
        if (temp.length >= 1) {
            sql += ' where ';
        }
        sql += temp.join(' AND ');
    }
    sql += 'GROUP BY story.`id`;';

    return new Promise(function (resolve, reject) {
        builder.run(sql)
            .then(function (stories) {
                var i = 0;
                var len = stories.length;
                stories.forEach(function (story) {
                    Promise.all([taskDao.getByStoryId(story.id), defectDao.getByStoryId(story.id)])
                        .then(function (datas) {
                            story.tasks = datas[0];
                            story.defects = datas[1];
                            if (++i >= len) {
                                resolve(stories);
                            }
                        })
                        .catch(function (error) {
                            reject('error happen when get list');
                        });
                });
            });
    });
}