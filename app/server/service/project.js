/**
 * Created by YouHan on 2016/9/19.
 */
var dao = require('./../model/project');
var release = require('./../model/release');
var common = require('./../common/common');

module.exports = {
    get: get,       //get project with release
    add: add,       //add basic project info
    update: update, //update basic project info
    getAll: getAll, //get all project info with release
    updateRelease: updateRelease
};

function add(data) {
    if (data.team_id) {
        return dao.add(data)
            .catch(function (error) {
                throw new Error('error happen when add project');
            });
    } else {
        return common.promiseError('no team id');
    }
}

function get(id) {
    if (!id) {
        common.promiseError('no project id');
    }
    return dao.get(id)
        .then(function (projects) {
            if (projects && projects.length > 0) {
                var project = projects[0];
                if (project.current_release_id) {
                    return release.get(project.current_release_id)
                        .then(function (releases) {
                            if (releases && releases.length > 0) {
                                project.release = releases[0];
                            }
                            return project;
                        });
                }
            } else {
                return null;
            }
        })
        .catch(function (error) {
            throw new Error(error);
        });
}

function getAll() {
    return dao.getAll()
        .catch(function (error) {
            throw new Error('error happen when get all project');
        });
}

function update(data) {
    if (!data.id) {
        return common.promiseError('no project id');
    } else {
        return dao.get(data.id)
            .then(function (results) {
                if (results && results.length > 0) {
                    var oriData = results[0];
                    if (data.team_id) {
                        oriData.team_id = data.team_id;
                    }
                    if (data.name) {
                        oriData.name = data.name;
                    }
                    if (data.status) {
                        oriData.status = data.status;
                    }
                    oriData.update_time = new Date();
                    return dao.update(oriData);
                } else {
                    return common.promiseError("can't find data with this id");
                }
            })
            .catch(function (error) {
                throw new Error('error happen when update project');
            });
    }
}

//release data
function updateRelease(id, releaseId) {
    if (!id || !releaseId) {
        return common.promiseError('no project id or release id');
    } else {
        return dao.updateRelease(id, releaseId);
    }
}