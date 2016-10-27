/**
 * Created by YouHan on 2016/10/27.
 */

var dao = require('./../model/story');
var common = require('./../common/common');
var convertor = require('./../convertor/story');

module.exports = {
    save: save,
    update: update,
    get: get,
    getList: getList,
};

function save(data) {
    var saveData = convertor.convert2Bo(data);
    saveData.update_time = new Date();
    saveData.create_time = new Date();
    return dao.add(saveData)
        .catch(function (error) {
            throw new error('error happen when save story');
        });
}

function update(dataVo) {
    var data = convertor.convert2Bo(dataVo);
    if (!data.id) {
        return common.promiseError('no story id');
    } else {
        return dao.get(data.id)
            .then(function (res) {
                var oriData = res[0];
                if (data.title) oriData.title = data.title;
                if (data.desc) oriData.desc = data.desc;
                if (data.notes) oriData.notes = data.notes;
                if (data.status) oriData.status = data.status;
                if (data.plan_est) oriData.plan_est = data.plan_est;
                if (data.start_date) oriData.start_date = data.start_date;
                if (data.end_date) oriData.end_date = data.end_date;
                if (data.qa) oriData.qa = data.qa;
                if (data.pm) oriData.pm = data.pm;
                if (data.fe) oriData.fe = data.fe;
                if (data.rd) oriData.rd = data.rd;
                if (data.owner_id) oriData.owner_id = data.owner_id;
                if (data.release_id) oriData.release_id = data.release_id;
                if (data.project_id) oriData.project_id = data.project_id;
                return dao.update(oriData);
            })
            .catch(function (error) {
                throw new error('error happen when update story');
            });
    }
}

function get(id) {
    if (!id) {
        return common.promiseError('no story id');
    } else {
        return dao.get(id)
            .then(function (res) {
                var result = {};
                if (res && res.length > 0) {
                    result = convertor.convert2Vo(res[0]);
                }
                return result;
            })
            .catch(function (error) {
                throw new error('error happen when get story');
            });
    }
}


function getList() {
    return dao.getList()
        .then(function (res) {
            var results = [];
            if (res && res.length > 0) {
                results = convertor.convert2VoList(res);
            }
            return results;
        })
        .catch(function (error) {
            throw new error('error happen when get story list');
        });
}
