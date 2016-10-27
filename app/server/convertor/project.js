/**
 * Created by YouHan on 2016/10/23.
 */
var release = require('./release');


module.exports = {
    convert2Bo: convert2Bo,
    convert2Vo: convert2Vo,
    convert2VoList: convert2VoList
};

function convert2VoList(bos) {
    var results = [];
    bos.forEach(function (item) {
        results.push(convert2Vo(item));
    });
    return results;
}


function convert2Bo(vo) {
    return {
        id: vo.id,
        team_id: vo.teamId,
        name: vo.name,
        status: vo.status,
        current_release_id: vo.currentReleaseId,
        release_interval: vo.releaseInterval,
        release_unit: vo.releaseUnit,
        create_time: vo.createTime,
        update_time: vo.updateTime
    };
}

function convert2Vo(bo) {
    var result = {
        id: bo.id,
        teamId: bo.team_id,
        name: bo.name,
        status: bo.status,
        currentReleaseId: bo.current_release_id,
        releaseInterval: bo.release_interval,
        releaseUnit: bo.release_unit,
        createTime: bo.create_time,
        updateTime: bo.update_time
    };
    if (bo.release) {
        result.release = release.changeToVO(bo.release);
    }
    return result;
}