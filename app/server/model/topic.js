/**
 * Created by YouHan on 2016/11/22.
 */
var mysql = require('mysql')
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
            var sql = 'SELECT t.*, c.`id` AS c_id, c.`title` AS c_title FROM `tbl_topic` t ' +
              ' LEFT JOIN `tbl_topic_content` c ' +
              ' ON t.`id` = c.`topic_id` ' +
              ' WHERE t.id IN (' + mysql.escape(topicIds) + ');';
            builder.run(sql)
              .then(function (res2) {
                var result = [];
                if (res2 && res2.length > 0) {
                  var tempObj = {};
                  for (var i = 0, ii = res2.length; i < ii; i++) {
                    var item = tempObj[res2[i].id];
                    var oriItem = res2[i];
                    if (!item) {
                      tempObj[res2[i].id] = {
                        id: oriItem.id,
                        title: oriItem.title,
                        owner_id: oriItem.owner_id,
                        shares: []
                      }
                    }
                    if (oriItem.c_id) {
                      tempObj[res2[i].id].shares.push({
                        id: oriItem.c_id,
                        title: oriItem.c_title
                      })
                    }
                  }
                  for (var i in tempObj) {
                    result.push(tempObj[i]);
                  }
                }
                resolve(result);
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