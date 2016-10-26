/**
 * Created by YouHan on 2016/9/19.
 */
var logger = require('./../utils/logger');
var dao = require('./../model/release');
var common = require('./../common/common');
var project = require('./../model/project');

module.exports = {
    add: add,
    get: get,
    update, update,
    getByProjectId: getByProjectId,
    getAllByProject: getAllByProject
};

function add(data) {
    if (data.project_id) {
        return dao.add(data)
            .then(function(res){
                var id = res.insertId;
                return project.updateRelease(data.project_id, id);
            })
            .catch(function (error) {
                throw new Error('error happen when add release');
            });
    } else {
        return common.promiseError('no project id');
    }
}

function get(id) {
    if (!id) {
        return common.promiseError('no release id');
    } else {
        return dao.get(id)
            .catch(function (error) {
                throw new Error('error happen when get release');
            });
    }
}

function getByProjectId(projectId) {
    if (!projectId) {
        return common.promiseError('no release id');
    } else {
        return dao.getByProjectId(projectId)
            .catch(function (error) {
                throw new Error('error happen when get release');
            });
    }
}

function update(data) {
    if (!data.id) {
        return common.promiseError('no release id');
    } else {
        return dao.get(data.id)
            .then(function (results) {
                if (results && results.length > 0) {
                    var oriData = results[0];
                    if (data.project_id) {
                        oriData.project_id = data.project_id;
                    }
                    if (data.start_date) {
                        oriData.start_date = data.start_date;
                    }
                    if (data.end_date) {
                        oriData.end_date = data.end_date;
                    }
                    if (data.number) {
                        oriData.number = data.number;
                    }
                    oriData.update_time = new Date();
                    return dao.update(oriData);
                } else {
                    return common.promiseError('no data for this release id');
                }
            })
            .catch(function (error) {
                throw new Error('error happen when update release');
            });
    }
}

function getAllByProject(projectId) {
    if (!projectId) {
        return common.promiseError(' no project id for get release');
    } else {
        return dao.getAllByProject(projectId)
            .catch(function (error) {
                throw new Error('error happen when get all releases by project id');
            })
    }
}