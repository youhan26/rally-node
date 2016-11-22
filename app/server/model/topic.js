/**
 * Created by YouHan on 2016/11/22.
 */
var builder = require('./../db/builder');

module.exports = {
  add: add,
  getAll: getAll,
  getTopicsByUserId: getTopicsByUserId,
  setTopicByUserId: setTopicByUserId
};

function add(data) {
  return builder.insert('tbl_topic', [{
    'title': data.title,
    'owner_id': data.owner_id,
    'create_time': new Date(),
    'update_time': new Date()
  }]).end();
}

function getAll() {
  return builder.select('tbl_topic')
    .orderBy(['id', 'create_time'])
    .end();
}


function getTopicsByUserId(id) {
  return new Promise(function (resolve, reject) {
    builder.select('tbl_member')
      .where({
        id: id
      })
      .end()
      .then(function (res) {
        if (res && res.length === 1) {
          var topicIds = JSON.parse(res[0].topics);
          if (topicIds.length > 0) {
            builder.select('tbl_topic')
              .where({
                id: topicIds
              }).end()
              .then(function (res2) {
                resolve(res2);
              }, function (error) {
                reject(error);
              });
          } else {
            resolve([]);
          }
        } else {
          reject('no user');
        }
      }, function (error) {
        reject(error);
      }).catch(function (error) {
      reject(error);
    });
  })
}

function setTopicByUserId(id, list) {
  return builder.update('tbl_member', {
    'topics': JSON.stringify(list),
    'update_time': new Date()
  })
    .where({
      id: id
    })
    .end();
}