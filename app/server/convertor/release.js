/**
 * Created by YouHan on 2016/10/23.
 */

exports.changeToBO = function (vo) {
    var bo = {};
    bo.id = vo.id;
    bo.project_id = vo.projectId;
    bo.number = vo.number;
    bo.start_date = vo.startDate;
    bo.end_date = vo.endDate;
    bo.create_time = vo.createTime;
    bo.update_time = vo.updateTime;
    return bo;
};

exports.changeToVO = function (bo) {
    var vo = {};
    vo.id = bo.id;
    vo.projectId = bo.project_id;
    vo.number = bo.number;
    vo.startDate = bo.start_date;
    vo.endDate = bo.end_date;
    vo.createTime = bo.create_time;
    vo.updateTime = bo.update_time;
    return vo;
};