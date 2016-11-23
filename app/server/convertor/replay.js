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
  if (!vo) {
    return {};
  }
  return {
    id: vo.id,
    topic_content_id: vo.shareId,
    content: vo.content,
    owner_id: vo.ownerId
  }
}

function changeToVO(bo) {
  if (!bo) {
    return {};
  }
  return {
    id: bo.id,
    topicId: bo.topic_content_id,
    ownerId: bo.owner_id,
    content: bo.content,
    createTime: bo.create_time,
    updateTime: bo.update_time
  }
}