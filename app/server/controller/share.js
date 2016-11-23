/**
 * Created by YouHan on 2016/9/19.
 */
var express = require('express');
var router = express.Router();
var share = require('./../service/share');
var convertor = require('./../convertor/share');
var replayConvertor = require('./../convertor/replay');
var common = require('./../common/common');

router.param('id', function (req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.params.id = id;
  next();
});

router.post('/getReplay', function (req, res) {
  var params = req.body;
  share.getReplay(params.id).then(function (data) {
    res.send({
      success: true,
      data: replayConvertor.change2VoList(data)
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
  .get(function (req, res, next) {
    var id = req.params.id;
    if (!id) {
      res.send({
        success: false,
        reason: 'no id'
      });
      return;
    }
    share.get(req.params.id)
      .then(function (data) {
        res.send({
          success: true,
          data: convertor.changeToVO(data)
        });
      }, function (error) {
        common.sendError(res, error);
      })
      .catch(function (error) {
        common.sendError(res, error);
      });
  })
  .post(function (req, res, next) {
    var params = req.body;
    share.add(convertor.changeToBO(params)).then(function (data) {
      res.send({
        success: true,
        data: data
      });
    }, function (error) {
      common.sendError(res, error);
    }).catch(function (error) {
      common.sendError(res, error);
    });
  });
module.exports = router;