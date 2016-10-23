/**
 * Created by YouHan on 2016/9/19.
 */
/**
 * Created by YouHan on 2016/8/5.
 */
var builder = require('./../db/builder');

//add function
exports.add = function (data) {
    return builder.insert('tbl_task', [{
        'title': data.title,
        'desc': data.desc,
        'status': data.status,
        'owner_id': data.owner_id,
        'est': data.est,
        'todo': data.todo,
        'story_id': data.story_id,
        'create_time': new Date(),
        'update_time': new Date()
    }]).end();
};


exports.get = function (id) {
    return builder.select('tbl_task')
        .where({
            id: id
        })
        .orderBy(['id desc', 'create_time'])
        .end();
};

exports.update = function (data) {
    return builder.update('tbl_task', {
        'title': data.title,
        'desc': data.desc,
        'status': data.status,
        'owner_id': data.owner_id,
        'est': data.est,
        'todo': data.todo,
        'story_id': data.story_id,
        'update_time': new Date()
    })
        .where({
            id: data.id
        })
        .end();
};

//get all function
exports.getAll = function () {
    return builder.select('tbl_task')
        .orderBy(['id desc', 'create_time'])
        .end();
};