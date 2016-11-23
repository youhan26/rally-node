/**
 * Created by YouHan on 2016/11/22.
 */
var builder = require('./../db/builder');

module.exports = {
  add: add
};

function add(data) {
  return builder.insert('tbl_replay', [{
    'title': data.title,
    'topic_content_id': data.topic_content_id,
    'owner_id': data.owner_id,
    'content': data.content,
    'create_time': new Date(),
    'update_time': new Date()
  }]).end();
}