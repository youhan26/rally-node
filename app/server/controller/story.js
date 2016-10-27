/**
 * Created by YouHan on 2016/9/19.
 */
var express = require('express');
var path = require('path');
var router = express.Router();
var story = require('./../service/story');
var common = require('./../common/common');

router.param('id', function (req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.params.id = id;
    next();
});


router.get('/all', function (req, res) {
    story.getList()
        .then(function (data) {
            res.send({
                success: true,
                data: data
            });
        }, function (error) {
            common.sendError(res, error);
        })
        .catch(function (error) {
            common.sendError(res, error);
        });
});

// router.patch('/release')

/**
 *      /story/:id?
 */
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
        story.get(req.params.id)
            .then(function (data) {
                res.send({
                    success: true,
                    data: data
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
        story.save(params)
            .then(function () {
                res.send({
                    success: true
                });
            }, function (error) {
                common.sendError(res, error);
            })
            .catch(function (error) {
                common.sendError(res, error);
            });
    })
    .patch(function (req, res, next) {
        var params = req.body;
        story.update(params)
            .then(function () {
                res.send({
                    success: true
                });
            }, function (error) {
                common.sendError(res, error);
            })
            .catch(function (error) {
                common.sendError(res, error);
            });
    });

module.exports = router;