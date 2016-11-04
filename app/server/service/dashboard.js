/**
 * Created by YouHan on 2016/10/27.
 */

var common = require('./../common/common');
var convertor = require('./../convertor/dashboard');
var dao = require('./../model/dashboard');


module.exports = {
    getList: getList
};

function getList(obj) {
    var condition = convertor.convert2Bo(obj);
    return dao.getList(condition)
        .then(function(data){
            return convertor.convert2VoList(data);
        })
        .catch(function (error) {
            throw new error('error happen when get dashboard data');
        });
}