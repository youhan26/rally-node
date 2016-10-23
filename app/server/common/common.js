***REMOVED***
 * Created by YouHan on 2016/10/23.
***REMOVED***
exports.sendError = function (res, error) {
    res.send({
        success: false,
        reason: error || 'error happen'
    ***REMOVED***
};