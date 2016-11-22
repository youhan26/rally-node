/**
 * Created by YouHan on 2016/9/19.
 */
var express = require('express');
var router = express.Router();
var login = require('./../service/login');
var common = require('./../common/common');
var convertor = require('./../convertor/member');

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
    login.login(params).then(function (data) {
      res.send({
        success: true,
        data: convertor.change2Vo(data)
      });
    }, function (error) {
      common.sendError(res, error);
    }).catch(function (error) {
      common.sendError(res, error);
    });
  });


module.exports = router;