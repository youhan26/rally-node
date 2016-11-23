/**
 * Created by YouHan on 2016/10/23.
 */

module.exports = {
  changeToBO: changeToBO,
  changeToVO: changeToVO
};

function changeToBO(vo) {
  if (!vo) {
    return {};
  }
  return {
    id: vo.id,
    topic_id: vo.topicId,
    title: vo.title,
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
    topicId: bo.topic_id,
    title: bo.title,
    ownerId: bo.owner_id,
    content: bo.content,
    createTime: bo.create_time,
    updateTime: bo.update_time
  }
}