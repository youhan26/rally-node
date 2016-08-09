***REMOVED***
 * Created by YouHan on 2016/8/5.
***REMOVED***
var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new winston.transports.File({
            filename: __dirname + '/info.log'
        })
    ],

    exceptionHandlers: [
        new winston.transports.File({filename: __dirname + '/exceptions.log'})
    ]
***REMOVED***

module.exports = logger;