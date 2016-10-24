/**
 * Created by YouHan on 2016/8/5.
 */
var express = require('express');
var event = require('./model\'/timeLine/event');
var authRouter = require('./../../app/server/common/auth');
var router = express.Router();

//root path:/event

router.use(authRouter);

router.param('id', function (req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.params.id = id;
    next();
});


/**
 *      /timeLine/event/chart/:id
 */
router.get('/chart/:id', function (req, res) {
    event.getByChartId(req.params.id).then(function (data) {
        res.send({
            success: true,
            data: data
        });
    }).then(function () {
        res.send({
            success: false,
            reason: error || 'error happen'
        });
    });
});
router.post('/chart/:id', function (req, res) {
    if (!req.params.id || !req.body.name) {
        res.send({
            success: false,
            reason: 'no id or no name'
        });
        return;
    }

    event.saveByChartId(req.params.id, req.body.name).then(function (data) {
        res.send({
            success: true,
            data: data
        });
    }).then(function () {
        res.send({
            success: false,
            reason: error || 'error happen'
        });
    });
});


router.route('/:id?')
    .all(function (req, res, next) {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        next();
    })
    .get(function (req, res, next) {
        var id;
        if (req.params) {
            id = req.params.id;
        }
        event.get(id).then(function (data) {
            res.send({
                success: true,
                data: data
            });
        }).then(function (reason) {
            res.send({
                success: false,
                reason: reason || 'error happen'
            });
        });
    })
    .post(function (req, res, next) {
        var params = req.params;
        event.add(params.sid, params.name).then(function (res) {
            res.send({
                success: true
            });
        }).then(function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            });
        });
    })
    .patch(function (req, res, next) {
        var params = req.params;
        event.update(params.id, params.sid, params.name).then(function (res) {
            res.send({
                success: true
            });
        }).then(function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            });
        });
    })
    .delete(function (req, res, next) {
        var params = req.params;
        event.remove(params.id).then(function (res) {
            res.send({
                success: true
            });
        }).then(function (error) {
            res.send({
                success: false,
                reason: error || 'error happen'
            });
        });
    });

module.exports = router;