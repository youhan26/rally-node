/**
 * Created by YouHan on 2016/9/19.
 */
var express = require('express');
var path = require('path');
var router = express.Router();

// router.param('id', function (req, res, next, id) {
//     // sample user, would actually fetch from DB, etc...
//     req.params.id = id;
//     next();
// });


/**
 *      /rally/chart/tree
 */
router.get('/project', function (req, res) {
    chart.get().then(function (data) {
        res.send({
            success: true,
            data: setTree(data)
        });
    }).then(function () {
        res.send({
            success: false,
            reason: error || 'error happen'
        });
    });
});


module.exports = router;