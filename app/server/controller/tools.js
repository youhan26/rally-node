/**
 * Created by YouHan on 2016/9/19.
 */
var express = require('express');
var router = express.Router();
var tools = require('./../service/tools');

router.param('id', function (req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.params.id = id;
    next();
});


router.get('/convertor/pt2rem', function (req, res) {
    res.send({
        success: true,
        data: tools.pt2rem(req.query)
    });
});

module.exports = router;