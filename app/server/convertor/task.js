***REMOVED***
 * Created by YouHan on 2016/10/23.
***REMOVED***

exports.changeToBO = function (vo) {
    var bo = {};
    bo.id = vo.id;
    bo.title = vo.title;
    bo.desc = vo.desc;
    bo.status = vo.status;
    bo.owner_id = vo.ownerId;
    bo.est = vo.est;
    bo.todo = vo.todo;
    bo.story_id = vo.storyId;
    bo.create_time = vo.createTime;
    bo.update_time = vo.updateTime;
    return bo;
};

exports.changeToVO = function (bo) {
    var vo = {};
    vo.id = bo.id;
    vo.title = bo.title;
    vo.desc = bo.desc;
    vo.status = bo.status;
    vo.ownerId = bo.owner_id;
    vo.est = bo.est;
    vo.todo = bo.todo;
    vo.storyId = vo.story_id;
    vo.createTime = vo.create_time;
    vo.updateTime = vo.update_time;
    return vo;
};