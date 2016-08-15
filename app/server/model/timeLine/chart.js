***REMOVED***
 * Created by YouHan on 2016/8/5.
***REMOVED***
var pool = require('./../../db/pool');
var mysql = require('mysql');

//add function
exports.add = function (pid, name) {
    return new Promise(function (resolver, rejector) {
        if (!pid || !name) {
            rejector('no pid or blank name')
        }
        pool.getConnection(function (err, connection) {
            if (err) {
                rejector('err happen when connect db');
                throw err;
            }
            var sql = "INSERT INTO tbl_chart (`parent_id`, `name`, `create_time`, `update_time`) values (?, ? , ? , ?)";
            var inserts = [pid, name, new Date(), new Date()];

            connection.query(sql, inserts, function (err, rows) {
                if (err) {
                    console.error(err);
                    rejector(error);
                    throw err;
                }
                resolver(rows);
                connection.release();
            ***REMOVED***
        ***REMOVED***
    })
};

//update function
exports.update = function (id, pid, name) {
    return new Promise(function (resolver, rejector) {
        if (!id || !pid || !name) {
            rejector('no pid or no name');
        }
        pool.getConnection(function (err, conn) {
            if (err) {
                rejector('err happen when connect db');
                throw err;
            }
            var sql = "UPDATE tbl_chart SET pid = ?, name = ?, update_time = ?  WHERE id = ?";
            var inserts = [pid, name, new Date(), id];

            conn.query(sql, inserts, function (err, rows) {
                if (err) {
                    rejector(err);
                    throw err;
                }
                resolver(rows);
                conn.release();
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
};

//get function
exports.get = function (id) {
    return new Promise(function (resolver, rejector) {
        pool.getConnection(function (err, conn) {
            if (err) {
                rejector('err happen when connect db');
                throw err;
            }
            var sql;
            if (id) {
                sql = mysql.format("SELECT * from tbl_chart where id= ?", [id]);
            } else {
                sql = mysql.format("SELECT * from tbl_chart");
            }
            conn.query(sql, function (err, rows) {
                if (err) {
                    rejector('err when execute sql');
                    throw err;
                }
                resolver(rows);
                conn.release();
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
};


//remove function
exports.remove = function (id) {
    return new Promise(function (resolver, rejector) {
        if (!id) {
            rejector('no id');
        }
        pool.getConnection(function (err, conn) {
            if (err) {
                rejector('err happen when connect db');
                throw err;
            }
            var sql = mysql.format("DELETE FROM tbl_chart WHERE id = ?;" +
                "DELETE FROM tbl_event WHERE associate_id = ?", [id, id]);

            conn.query(sql, function (err, rows) {
                if (err) {
                    rejector('err happen when execute sql' + err);
                    throw err;
                }
                resolver(rows);
                conn.release();
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
};