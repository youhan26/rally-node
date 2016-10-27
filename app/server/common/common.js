/**
 * Created by YouHan on 2016/10/23.
 */

module.exports = {
    sendError: sendError,
    promiseError: promiseError
};

function promiseError(message) {
    return new Promise(function (resolve, reject) {
        reject(message);
    });
}

function sendError(res, error) {
    var reason = error;
    if (error && error.message) {
        reason = error.message;
    }
    res.send({
        success: false,
        reason: reason || 'error happen'
    });
}

