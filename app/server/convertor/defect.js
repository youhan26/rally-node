/**
 * Created by YouHan on 2016/10/23.
 */


module.exports = {
    convert2VoList: convert2VoList,
    changeToBO: changeToBO,
    changeToVO: changeToVO
};

function convert2VoList(bos) {
    var list = [];
    bos.forEach(function (item) {
        list.push(changeToVO(item));
    });
    return list;
}


function changeToBO(vo) {
    var bo = {};
    bo.id = vo.id;
    bo.title = vo.title;
    bo.desc = vo.desc;
    bo.file = vo.file;
    bo.status = vo.status;
    bo.reopen = vo.reopen;
    bo.reopen_reason = vo.reopenReason;
    bo.priority = vo.priority;
    bo.owner_id = vo.ownerId;
    bo.story_id = vo.storyId;
    bo.submit_id = vo.submitId;
    bo.create_time = vo.createTime;
    bo.update_time = vo.updateTime;
    return bo;
}

function changeToVO(bo) {
    var vo = {};
    vo.id = bo.id;
    vo.title = bo.title;
    vo.desc = bo.desc;
    vo.file = bo.file;
    vo.status = bo.status;
    vo.reopen = bo.reopen;
    vo.reopenReason = bo.reopen_reason;
    vo.priority = bo.priority;
    vo.ownerId = bo.owner_id;
    vo.storyId = bo.story_id;
    vo.submitId = bo.submit_id;
    vo.createTime = bo.create_time;
    vo.updateTime = bo.update_time;
    return vo;
}