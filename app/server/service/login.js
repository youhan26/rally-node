/**
 * Created by YouHan on 2016/9/19.
 */
var member = require('./../model/member');

exports.login = function (data) {
    return member.login(data);
};