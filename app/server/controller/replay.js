/**
 * Created by YouHan on 2016/9/19.
 */
var express = require('express');
var router = express.Router();
var replay = require('./../service/replay');
var convertor = require('./../convertor/replay');
var common = require('./../common/common');

router.param('id', function (req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.params.id = id;
  next();
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
    replay.add(convertor.changeToBO(params)).then(function () {
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