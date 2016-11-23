/**
 * Created by YouHan on 2016/9/19.
 */
/**
 * Created by YouHan on 2016/8/5.
 */
var builder = require('./../db/builder');
var logger = require('./../utils/logger');

module.exports = {
  add: add,
  get: get,
  update: update,
  getAll: getAll,
  login: login
};


//add function
function add(data) {
  return builder.insert('tbl_member', [{
    'name': data.name,
    'introduction': data.introduction,
    'role_id': data.role_id,
    'topics': JSON.stringify([]),
    'create_time': new Date(),
    'update_time': new Date()
  }])
    .end();
}


//get function
function get(id) {
  return builder.select('tbl_member')
    .where({
      id: id
    })
    .orderBy(['id desc', 'create_time'])
    .end();
}

function update(data) {
  return new Promise(function (resolver, rejector) {
    if (!data.id) {
      rejector('no id');
      return;
    }
    builder.update('tbl_member', {
      'name': data.name,
      'introduction': data.introduction,
      'role_id': data.role_id,
      'create_time': new Date(),
      'update_time': new Date()
    })
      .where({
        id: data.id
      })
      .end()
      .then(function (res) {
        logger.info('update success ', res);
        resolver(res);
      }, function (error) {
        logger.error('error happen update project', error);
        rejector(error);
      });
  });
}


//get all function
function getAll() {
  return new Promise(function (resolver, rejector) {
    builder.select('tbl_member')
      .orderBy(['id desc', 'create_time'])
      .end()
      .then(function (res) {
        logger.info('get success');
        resolver(res)
      }, function (error) {
        logger.error('error happen ', error);
        rejector(error);
      });
  })
}

function login(data) {
  return new Promise(function (resolver, rejector) {
    builder.select('tbl_member')
      .where({
        nickname: data.name
      })
      .orderBy(['id desc', 'create_time'])
      .end()
      .then(function (res) {
        if (res && res.length == 1) {
          if (res[0].password === data.password) {
            get(res[0].id).then(function (res2) {
              if (res2 && res2.length === 1) {
                resolver(res2[0]);
              } else {
                rejector('error');
              }
            }, function (error) {
              rejector('error');
            })
          } else {
            rejector('密码不正确');
          }
        } else {
          rejector('用户不存在');
        }
      }, function (error) {
        logger.error('error happen get tbl_member', error, id);
        rejector(error);
      })
      .catch(function (error) {
        rejector(error);
      });
  });
}