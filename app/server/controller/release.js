/**
 * Created by YouHan on 2016/9/19.
 */
var express = require('express');
var router = express.Router();
var release = require('./../service/release');
var convertor = require('./../convertor/release');
var common = require('./../common/common');

router.param('id', function (req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.params.id = id;
    next();
});


router.get('/all', function (req, res) {
    release.getAll().then(function (data) {
        var result = [];
        if (data && data.length > 0) {
            data.forEach(function (item) {
                result.push(convertor.changeToVO(item));
            });
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

/**
 *      /release/:id?
 */
router.route('/:id?')
    .all(function (req, res, next) {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        //TODO load data?
        next();
    })
    .get(function (req, res, next) {
        if (req.query.projectId) {
            release.getAllByProject(req.query.projectId).then(function (data) {
                var result = [];
                if (data && data.length > 0) {
                    data.forEach(function (item) {
                        result.push(convertor.changeToVO(item));
                    });
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
        } else {
            release.get(req.params.id).then(function (data) {
                res.send({
                    success: true,
                    data: convertor.changeToVO(data)
                });
            }, function (error) {
                common.sendError(res, error);
            }).catch(function (error) {
                common.sendError(res, error);
            });
        }
    })
    .post(function (req, res, next) {
        var params = req.body;
        if (!params.projectId) {
            res.send({
                success: false,
                reason: 'each release must have a project '
            });
            return;
        }
        release.add(convertor.changeToBO(params)).then(function () {
            res.send({
                success: true
            });
        }, function (error) {
            common.sendError(res, error);
        }).catch(function (error) {
            common.sendError(res, error);
        });
    })
    .patch(function (req, res, next) {
        var params = req.body;
        release.update(convertor.changeToBO(params)).then(function () {
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