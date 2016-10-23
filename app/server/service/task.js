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
                if(oriData && oriData.length==1){
                    var temp = oriData[0];
                    if (data.title != null) temp.title = data.title;
                    if (data.desc != null) temp.desc = data.desc;
                    if (data.status != null) temp.status = data.status;
                    if (data.owner_id != null) temp.owner_id = data.owner_id;
                    if (data.est != null) temp.est = data.est;
                    if (data.todo != null) temp.todo = data.todo;
                    if (data.story_id != null) temp.story_id = data.story_id;
                    return dao.update(temp);
                }else{
                    logger.error('can get by id');
                    throw new Error();
                }
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