/**
 * Created by YouHan on 2016/9/19.
 */
var dao = require('./../model/replay');
var common = require('./../common/common');

module.exports = {
  add: add
};

function add(data) {
  return dao.add(data)
    .catch(function (error) {
      throw new Error('error happen when add replay');
    });
}