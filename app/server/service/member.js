***REMOVED***
 * Created by YouHan on 2016/9/19.
***REMOVED***
var member = require('./../model/member');

exports.add = function (data) {
    return member.add(data);
};

exports.get = function (id) {
    return member.get(id);
};

exports.update = function (data) {
    return member.update(data);
};

exports.getAll = function () {
    return member.getAll();
};