/**
 * Created by YouHan on 2016/9/19.
 */
/**
 * Created by YouHan on 2016/8/5.
 */
var builder = require('./../db/builder');
var logger = require('./../utils/logger');


/**
 * add function
 * @param data
 * @returns {Promise}
 */
exports.add = function add(data) {
    return builder.insert('tbl_member_has_team', data).end();
};


/**
 * get function
 * @param selector
 * @returns {Promise}
 */
exports.get = function get(selector) {
    return new Promise(function (resolve, reject) {
        if (selector) {
            builder.select('tbl_member_has_team')
                .where(selector)
                .orderBy(['id desc', 'create_time'])
                .end()
                .then(function (res) {
                    logger.info('get success from tbl_member_has_team', res, id);
                    resolve(res);
                }, function (error) {
                    logger.error('error happen get tbl_member_has_team', error, id);
                    reject(error);
                });
        }
    });
};

/**
 * del function
 * @param selector
 * @returns {Promise}
 */
exports.del = function (selector) {
    return new Promise(function (resolve, reject) {
        builder.delete('tbl_member_has_team')
            .where(selector)
            .end()
            .then(function (res) {
                logger.info('update success fro member_has_team ', res);
                resolve(res);
            }, function (error) {
                logger.error('error happen update member has team', error);
                reject(error);
            });
    });
};