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
  return builder.select('tbl_topic_content')
    .where({
      id: id
    })
    .orderBy(['id', 'create_time'])
    .end();
}

function getReplay(id) {
  return builder.select('tbl_replay')
    .where({
      topic_content_id: id
    })
    .orderBy(['create_time'])
    .end();
}