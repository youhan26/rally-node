/**
 * Created by YouHan on 2016/8/29.
 */
var express = require('express');
var path = require('path');
var router = express.Router();

// router.param('id', function (req, res, next, id) {
//     // sample user, would actually fetch from DB, etc...
//     req.params.id = id;
//     next();
// });

router.get('dashboard/dataList', function (req, res) {
    console.log('fdsfsd');
    res.send({
        success: true,
        data: [{
            region: 'Defined',
            regionName: 1,
            stories: [{
                id: 1,
                name: 'story 1',
                bugs: [{
                    id: 1,
                    name: 'bug 1',
                    status: 1
                }],
                tasks: [{
                    id: 1,
                    name: 'task 1',
                    status: 1,
                    todo: 1
                }, {
                    id: 2,
                    name: 'task 2',
                    status: 1,
                    todo: 2
                }]
            }, {
                id: 2,
                name: 'story 2',
                bugs: [{
                    id: 2,
                    name: 'bug 2',
                    status: 2
                }],
                tasks: [{
                    id: 3,
                    name: 'task 3',
                    status: 1,
                    todo: 1
                }, {
                    id: 4,
                    name: 'task 4',
                    status: 2,
                    todo: 2
                }]
            }]
        }, {
            region: 'Developing',
            regionName: 2,
            stories: [{
                id: 5,
                name: 'story 5',
                bugs: [{
                    id: 1,
                    name: 'bug 5',
                    status: 1
                }],
                tasks: [{
                    id: 5,
                    name: 'task 5',
                    status: 1,
                    todo: 1
                }, {
                    id: 5,
                    name: 'task 5',
                    status: 1,
                    todo: 2
                }]
            }, {
                id: 6,
                name: 'story 6',
                bugs: [{
                    id: 6,
                    name: 'bug 6',
                    status: 2
                }],
                tasks: [{
                    id: 6,
                    name: 'task 6',
                    status: 1,
                    todo: 1
                }, {
                    id: 7,
                    name: 'task 7',
                    status: 2,
                    todo: 2
                }]
            }]
        }]
    });
});


module.exports = router;