/**
 * Created by YouHan on 2016/9/19.
 */
var dao = require('./../model/share');
var common = require('./../common/common');

module.exports = {
  add: add,
  get: get,
  getReplay: getReplay
};

function add(data) {
  return dao.add(data)
    .catch(function (error) {
      throw new Error('error happen when add share');
    });
}

function get(id) {
  return dao.get(id)
    .catch(function (error) {
      throw new Error('error happen when get share');
    });
}


function getReplay(id) {
  if (!id) {
    return common.promiseError('no share id');
  }
  return dao.getReplay(id).catch(function () {
    throw new Error('error happen when get replay');
  });
}