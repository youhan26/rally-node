/**
 * Created by YouHan on 2016/10/23.
 */

module.exports = {
    convert2Bo: convertCondition,
};

function convertCondition(obj) {
    obj = obj || {};
    return {
        project_id: obj.projectId,
        owner_id: obj.ownerId
    };
}

