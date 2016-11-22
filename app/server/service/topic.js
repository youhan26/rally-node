/**
 * Created by YouHan on 2016/9/19.
 */
var dao = require('./../model/topic');
var common = require('./../common/common');

module.exports = {
  add: add,
  getAll: getAll,
  getTopicsByUserId: getTopicsByUserId,
  setTopicByUserId: setTopicByUserId
};

function add(data) {
  return dao.add(data)
    .catch(function (error) {
      throw new Error('error happen when add topic');
    });
}

function getAll() {
  return dao.getAll()
    .catch(function (error) {
      throw new Error('error happen when get all topic');
    });
}


function getTopicsByUserId(id) {
  if (!id) {
    return common.promiseError('no user id');
  }
  return dao.getTopicsByUserId(id).catch(function () {
    throw new Error('error happen when get topics by user id');
  });
}

function setTopicByUserId(data) {
  if (!data || !data.id || !data.list) {
    return common.promiseError('no data or user id');
  }
  return dao.setTopicByUserId(data.id, data.list).catch(function () {
    throw new Error('error happen when set topics by user id');
  });
}