/**
 * Created by YouHan on 2016/10/23.
 */

module.exports = {
  changeToBO: changeToBO,
  changeToVO: changeToVO,
  change2VoList: change2VoList
};

function change2VoList(bos) {
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
  bo.owner_id = vo.ownerId;
  bo.create_time = vo.createTime;
  bo.update_time = vo.updateTime;
  return bo;
}

function changeToVO(bo) {
  var vo = {};
  vo.id = bo.id;
  vo.title = bo.title;
  vo.ownerId = bo.owner_id;
  vo.createTime = bo.create_time;
  vo.updateTime = bo.update_time;
  vo.shares = bo.shares;
  return vo;
}