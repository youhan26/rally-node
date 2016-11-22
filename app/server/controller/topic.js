/**
 * Created by YouHan on 2016/9/19.
 */
var express = require('express');
var router = express.Router();
var topic = require('./../service/topic');
var convertor = require('./../convertor/topic');
var common = require('./../common/common');

router.param('id', function (req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.params.id = id;
  next();
});


router.get('/all', function (req, res) {
  topic.getAll().then(function (data) {
    var result = [];
    if (data && data.length > 0) {
      result = convertor.change2VoList(data);
    }
    res.send({
      success: true,
      data: result
    });
  }, function (error) {
    common.sendError(res, error);
  }).catch(function (error) {
    common.sendError(res, error);
  });
});

router.post('/setUserList', function (req, res) {
  var params = req.body;
  topic.setTopicByUserId(params).then(function () {
    res.send({
      success: true
    });
  }, function (error) {
    common.sendError(res, error);
  }).catch(function (error) {
    common.sendError(res, error);
  })
});

router.get('/getUserList', function (req, res) {
  var id = req.query.userId;
  topic.getTopicsByUserId(id).then(function (d) {
    res.send({
      success: true,
      data: convertor.change2VoList(d)
    });
  }, function (error) {
    common.sendError(res, error);
  }).catch(function (error) {
    common.sendError(res, error);
  })
});

router.route('/:id?')
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    //TODO load data?
    next();
  })
  .post(function (req, res, next) {
    var params = req.body;
    topic.add(convertor.changeToBO(params)).then(function () {
      res.send({
        success: true
      });
    }, function (error) {
      common.sendError(res, error);
    }).catch(function (error) {
      common.sendError(res, error);
    });
  });
module.exports = router;