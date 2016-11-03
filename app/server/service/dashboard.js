/**
 * Created by YouHan on 2016/10/27.
 */

var common = require('./../common/common');
var convertor = require('./../convertor/dashboard');
var storyDao = require('./../service/story');
var taskDao = require('./../service/task');
var defectDao = require('./../service/defect');


module.exports = {
    getList: getList
};

function getList(obj) {
    var condition = convertor.convert2Bo(obj);
    return Promise.all()
        .catch(function (error) {
            throw new error('error happen when get dashboard list');
        });
}
