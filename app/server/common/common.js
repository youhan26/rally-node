/**
 * Created by YouHan on 2016/10/23.
 */
exports.sendError = function (res, error) {
    res.send({
        success: false,
        reason: error || 'error happen'
    });
};