/**
 * Created by YouHan on 2016/9/19.
 */
var express = require('express');
var router = express.Router();
var defect = require('./../service/defect');
var convertor = require('./../convertor/defect');
var common = require('./../common/common');

router.param('id', function (req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.params.id = id;
    next();
});


router.get('/all', function (req, res) {
    defect.getAll().then(function (data) {
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
 *      /defect/:id?
 */
router.route('/:id?')
    .all(function (req, res, next) {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        //TODO load data?
        next();
    })
    .get(function (req, res, next) {
        defect.get(req.params.id).then(function (data) {
            res.send({
                success: true,
                data: convertor.changeToVO(data)
            });
        }, function (error) {
            common.sendError(res, error);
        }).catch(function (error) {
            common.sendError(res, error);
        });
    })
    .post(function (req, res, next) {
        var params = req.body;
        if (!params.storyId) {
            res.send({
                success: false,
                reason: 'each defect must have a story '
            });
            return;
        }
        defect.add(convertor.changeToBO(params)).then(function () {
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
        defect.update(convertor.changeToBO(params)).then(function () {
            res.send({
                success: true
            });
        }, function (error) {
            common.sendError(res, error);
        }).catch(function (error) {
            common.sendError(res, error);
        });
    })
    .delete(function (req, res, next) {
        var id = req.params.id;
        defect.del(id).then(function () {
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