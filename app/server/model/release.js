/**
 * Created by YouHan on 2016/9/19.
 */
/**
 * Created by YouHan on 2016/8/5.
 */
var builder = require('./../db/builder');

module.exports = {
    add: add,
    get: get,
    getByProjectId: getByProjectId,
    update, update,
    getAllByProject: getAllByProject
};


//add function
function add(data) {
    return builder.insert('tbl_release', [{
        'number': data.number,
        'project_id': data.project_id,
        'start_date': data.start_date,
        'end_date': data.end_date,
        'create_time': new Date(),
        'update_time': new Date()
    }]).end();
}

function get(id) {
    return builder.select('tbl_release')
        .where({
            'id': id
        })
        .orderBy(['number', 'create_time'])
        .end();
}

function getByProjectId(id) {
    return builder.select('tbl_release')
        .where({
            'project_id': id
        })
        .orderBy(['number', 'create_time'])
        .end();
}

function update(data) {
    return builder.update('tbl_release', {
        'number': data.number,
        'project_id': data.project_id,
        'start_date': data.start_date,
        'end_date': data.end_date,
        'update_time': new Date()
    })
        .where({
            id: data.id
        })
        .end();
}

//get all function
function getAll() {
    return builder.select('tbl_release')
        .orderBy(['number', 'create_time'])
        .end();
}

function getAllByProject(projectId) {
    return builder.select('tbl_release')
        .where({
            'project_id': projectId
        })
        .orderBy(['number', 'create_time'])
        .end();
}