***REMOVED***
 * Created by YouHan on 2016/9/19.
***REMOVED***
var logger = require('./../utils/logger');
var dao = require('./../model/task');
var convertor = require('./../convertor/task');


exports.add = function (data) {
    return dao.add(data)
        .catch(function (error) {
            logger.error(error);
            throw new Error('error happen when save task');
        ***REMOVED***
};

exports.get = function (id) {
    if (!id) {
        return new Promise(function (resolve, reject) {
            reject('no task id');
        ***REMOVED***
    } else {
        return dao.get(id).catch(function (error) {
            logger.error(error);
            throw new Error('error happen when save task');
        ***REMOVED***
    }

};

exports.update = function (data) {
    if (!data.id) {
        return new Promise(function (resolve, reject) {
            reject('no task id');
        ***REMOVED***
    } else {
        return dao.get(data.id)
            .then(function (oriData) {
                if (data.title != null) oriData.title = data.title;
                if (data.desc != null) oriData.desc = data.desc;
                if (data.status != null) oriData.status = data.status;
                if (data.owner_id != null) oriData.owner_id = data.owner_id;
                if (data.est != null) oriData.est = data.est;
                if (data.todo != null) oriData.todo = data.todo;
                if (data.story_id != null) oriData.story_id = data.story_id;
                return dao.update(oriData);
            })
            .catch(function (error) {
                logger.error(error);
                throw new Error('error happen when update task');
            ***REMOVED***
    }
};


exports.getAll = function () {
    return dao.getAll().catch(function (error) {
        logger.error(error);
        throw new Error('error happen when get tasks');
    ***REMOVED***
};