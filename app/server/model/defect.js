/**
 * Created by YouHan on 2016/9/19.
 */
/**
 * Created by YouHan on 2016/8/5.
 */
var builder = require('./../db/builder');

//add function
exports.add = function (data) {
    return builder.insert('tbl_defect', [{
        'title': data.title,
        'desc': data.desc || '',
        'file': data.file,
        'status': data.status || 1,
        'reopen': data.reopen,
        'reopen_reason': data.reopen_reason,
        'priority': data.priority,
        'owner_id': data.owner_id,
        'story_id': data.story_id,
        'submit_id': data.submit_id,
        'create_time': new Date(),
        'update_time': new Date()
    }]).end();
};


exports.get = function (id) {
    return builder.select('tbl_defect')
        .where({
            id: id
        })
        .orderBy(['id desc', 'create_time'])
        .end();
};

exports.update = function (data) {
    return builder.update('tbl_defect', {
        'title': data.title,
        'desc': data.desc || '',
        'file': data.file,
        'status': data.status || 1,
        'reopen': data.reopen,
        'reopen_reason': data.reopen_reason,
        'owner_id': data.owner_id,
        'story_id': data.story_id,
        'submit_id': data.submit_id,
        'update_time': new Date()
    })
        .where({
            id: data.id
        })
        .end();
};

exports.del = function (id) {
    return builder.delete('tbl_defect')
        .where({
            id: id
        })
        .end();
};

//get all function
exports.getAll = function (storyId) {
    if (storyId) {
        return builder.select('tbl_defect')
            .where({
                story_id: storyId
            })
            .orderBy(['id desc', 'create_time'])
            .end();
    } else {
        return builder.select('tbl_defect')
            .orderBy(['id desc', 'create_time'])
            .end();
    }
};