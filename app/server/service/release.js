/**
 * Created by YouHan on 2016/9/19.
 */
var logger = require('./../utils/logger');
var dao = require('./../model/release');


exports.add = function (data) {
    if (!data.story_id) {
        return new Promise(function (resolve, reject) {
            reject('no story id');
        });
    } else {
        return dao.add(data)
            .catch(function (error) {
                logger.error(error);
                throw new Error('error happen when save release');
            });
    }
};

exports.get = function (id) {
    if (!id) {
        return new Promise(function (resolve, reject) {
            reject('no release id');
        });
    } else {
        return dao.get(id).catch(function (error) {
            logger.error(error);
            throw new Error('error happen when save release');
        });
    }

};

exports.update = function (data) {
    if (!data.id) {
        return new Promise(function (resolve, reject) {
            reject('no release id');
        });
    } else {
        return dao.get(data.id)
            .then(function (oriData) {
                if (oriData && oriData.length == 1) {
                    var temp = oriData[0];
                    if (data.number != null) temp.number = data.number;
                    if (data.project_id != null) temp.project_id = data.project_id;
                    if (data.start_date != null) temp.start_date = data.start_date;
                    if (data.end_date != null) temp.end_date = data.end_date;
                    return dao.update(temp);
                } else {
                    logger.error('can get by id');
                    throw new Error();
                }
            })
            .catch(function (error) {
                logger.error(error);
                throw new Error('error happen when update release');
            });
    }
};

exports.getAll = function () {
    return dao.getAll()
        .catch(function (error) {
            logger.error(error);
            throw new Error('error happen when get releases');
        });
};

exports.getAllByProject = function (projectId) {
    return dao.getAllByProject(projectId)
        .catch(function (error) {
            logger.error(error);
            throw new Error('error happen when get releases');
        });
};