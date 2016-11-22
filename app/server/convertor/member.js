/**
 * Created by YouHan on 2016/11/22.
 */
module.exports = {
  change2Vo: change2Vo
};

function change2Vo(bo) {
  var result = {};
  if (bo) {
    result = {
      id: bo.id,
      name: bo.name,
      introduction: bo.introduction,
      nickname: bo.nickname,
      roleId: bo.role_id
    }
  }
  return result;
}
