/**
 * Created by YouHan on 2016/8/5.
 */
var pool = require('./../db/pool');
var mysql = require('mysql');

exports.save = function (pid, name) {
    return new Promise(function (resolver, rejecter) {
        if (!pid || !name) {
            rejecter('no pid or blank name')
        }
        pool.getConnection(function (err, connection) {
            if (err) {
                throw err;
            }
            var sql = "INSERT INTO tbl_chart ('pid', 'name', 'create_time', 'update_time') values (??, ?? , ?? , ??)";
            var inserts = [pid, name, new Date(), new Date()];
            sql = mysql.format(sql, inserts);

            connection.query(sql, function (err, rows) {
                if (err) {
                    throw err;
                }
                resolver(rows);
            });
        });
    })
};

exports.get = function () {
    return new Promise(function (resolver, rejecter) {
        pool.getConnection(function (err, conn) {
            if (err) {
                throw err;
            }
            var sql = "SELECT * FROM tbl_chart";
            conn.query(sql, function (err, rows) {
                if (err) {
                    throw err;
                }
                resolver(rows);
            });
        });
    });
};
