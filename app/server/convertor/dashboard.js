/**
 * Created by YouHan on 2016/10/23.
 */

var task = require('./task');
var defect = require('./defect');
var story = require('./story');


module.exports = {
    convert2Bo: convertCondition,
    convert2VoList : convert2VoList
};

function convertCondition(obj) {
    obj = obj || {};
    return {
        project_id: obj.projectId,
        owner_id: obj.ownerId,
        release_id: obj.releaseId
    };
}

function convert2VoList(list){
    var results = [];
    list.forEach(function (item) {
        var storyVo = story.convert2Vo(item);
        storyVo.taskList = task.convert2VoList(item.tasks);
        storyVo.defectList = defect.convert2VoList(item.defects);
        results.push(storyVo);
    });

    return results;
}

