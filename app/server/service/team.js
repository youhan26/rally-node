/**
 * Created by YouHan on 2016/9/19.
 */
var dao = require('./../model/team');


exports.add = function (data) {
    return dao.add(data);
};

exports.get = function (id) {
    return dao.get(id);
};

exports.update = function (data) {
    return dao.update(data);
};


exports.getAll = function () {
    return dao.getAll();
};