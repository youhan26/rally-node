/**
 * Created by YouHan on 2016/10/23.
 */

module.exports = {
    convert2Bo: convert2Bo,
    convert2Vo: convert2Vo,
    convert2VoList: convert2VoList,
    convertSearch: convertSearch
};

function convertSearch(obj) {
    return {
        title: obj.title,
        status: obj.status,
        owner_id: obj.ownerId,
        project_id: obj.projectId,
        release_id: obj.releaseId
    }
}


function convert2VoList(data) {
    var results = [];
    data.forEach(function (item) {
        results.push(convert2Vo(item));
    });
    return results;
}


function convert2Bo(vo) {
    return {
        id: vo.id,
        title: vo.title,
        desc: vo.desc,
        notes: vo.notes,
        status: vo.status,
        plan_est: vo.planEst,
        start_date: vo.startDate,
        end_date: vo.endDate,
        qa: vo.qa,
        pm: vo.pm,
        fe: vo.fe,
        rd: vo.rd,
        owner_id: vo.ownerId,
        release_id: vo.releaseId,
        project_id: vo.projectId,
        pi: vo.pid
    }
}

function convert2Vo(bo) {
    return {
        id: bo.id,
        title: bo.title,
        desc: bo.desc,
        notes: bo.notes,
        status: bo.status,
        planEst: bo.plan_est,
        taskEst: bo.task_est,
        todo: bo.todo,
        startDate: bo.start_date,
        endDate: bo.end_date,
        qa: bo.qa,
        pm: bo.pm,
        fe: bo.fe,
        rd: bo.rd,
        ownerId: bo.owner_id,
        releaseId: bo.release_id,
        projectId: bo.project_id,
        pid: bo.pid
    }
}


