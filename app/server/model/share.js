/**
 * Created by YouHan on 2016/11/22.
 */
var mysql = require('mysql')
var builder = require('./../db/builder');

module.exports = {
  add: add,
  get: get,
  getReplay: getReplay
};

function add(data) {
  return builder.insert('tbl_topic_content', [{
    'title': data.title,
    'owner_id': data.owner_id,
    'topic_id': data.topic_id,
    'content': data.content,
    'create_time': new Date(),
    'update_time': new Date()
  }]).end();
}

function get(id) {
  return new Promise(function (resolve, reject) {
    var sql = 'SELECT c.* , m.name, m.avatar ' +
      'FROM `tbl_topic_content` c ' +
      'LEFT JOIN `tbl_member` m ' +
      'ON c.`owner_id` = m.`id` ' +
      'WHERE c.`id` = ' + mysql.escape(id);
    builder.run(sql).then(function (res) {
      var result = {};
      if (res && res.length === 1) {
        var item = res[0];
        result = {
          id: item.id,
          topic_id: item.topic_id,
          title: item.title,
          content: item.content,
          file: item.file,
          create_time: item.create_time,
          update_time: item.update_time,
          owner: {
            id: item.owner_id,
            name: item.name,
            avatar: item.avatar
          }
        }
      }
      resolve(result);
    }, function (error) {
      reject(error)
    }).catch(function (error) {
      reject(error);
    })
  });
}

function getReplay(id) {
  return new Promise(function (resolve, reject) {
    var sql = 'SELECT r.* , m.name, m.avatar ' +
      ' FROM `tbl_replay` r ' +
      ' LEFT JOIN `tbl_member` m ' +
      ' ON r.`owner_id` = m.`id` ' +
      ' WHERE r.`topic_content_id` = ' + mysql.escape(id);
    console.log(sql);
    builder.run(sql).then(function (res) {
      var result = [];
      if (res && res.length > 0) {
        res.forEach(function (item) {
          result.push({
            owner: {
              id: item.owner_id,
              name: item.name,
              avatar: item.avatar
            },
            id: item.id,
            topic_content_id: item.topic_content_id,
            content: item.content,
            create_time: item.create_time,
            update_time: item.update_time
          });
        });
      }
      resolve(result);
    }, function (error) {
      reject(error);
    }).catch(function (error) {
      reject(error);
    })
  });
}