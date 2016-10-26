/**
 * Created by YouHan on 2016/9/19.
 */
var express = require('express');
var path = require('path');
var router = express.Router();
var project = require('./../service/project');
var common = require('./../common/common');
var convertor = require('./../convertor/project');

router.param('id', function (req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.params.id = id;
    next();
});


router.get('/all', function (req, res) {
    project.getAll()
        .then(function (data) {
            res.send({
                success: true,
                data: convertor.convert2VoList(data)
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
 *      /project/:id?
 */
router.route('/:id?')
    .all(function (req, res, next) {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        //TODO load data?
        next();
    })
    // .get(function (req, res, next) {
    //     var id = req.params.id;
    //     if (!id) {
    //         res.send({
    //             success: false,
    //             reason: 'no id'
    //         });
    //         return;
    //     }
    //     project.get(req.params.id)
    //         .then(function (data) {
    //             res.send({
    //                 success: true,
    //                 data: data
    //             });
    //         }, function (error) {
    //             common.sendError(res, error);
    //         })
    //         .catch(function (error) {
    //             common.sendError(res, error);
    //         });
    // })
    .post(function (req, res, next) {
        var params = req.body;
        project.add(convertor.convert2Bo(params))
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
        project.update(convertor.convert2Bo(params))
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