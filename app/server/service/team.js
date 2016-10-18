/**
 * Created by YouHan on 2016/9/19.
 */
var team = require('./../model/team');
var memberTeam = require('./../model/memberTeam');

exports.add = function (data) {
    var memberIds = data.memberIds;
    return team.add(data).then(function (res) {
        if (memberIds && memberIds.length > 0) {
            var temp = [];
            memberIds.forEach(function (item) {
                temp.push({
                    'member_id': item,
                    'team_id': res.insertId
                })
            });
            return memberTeam.add(temp);
        }
    });
};

exports.get = function (id) {
    var All = Promise.all;
    All(team.get(id), memberTeam.get(id))
        .then(function (data1, data2) {
            data1.memberIds = data2;
            return data1;
        });
};

exports.update = function (data) {
    var id = data.id;
    var memberIds = data.memberIds;

    return team.update(data).then(function () {
        return memberTeam.del({
            'team_id': id
        }).then(function () {
            var temp = [];
            memberIds.forEach(function (item) {
                temp.push({
                    'team_id': id,
                    'member_id': item
                })
            });
            return memberTeam.add(temp);
        });
    });
};

exports.getAll = function () {
    return team.getAll();
};