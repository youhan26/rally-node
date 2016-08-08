/**
 * Created by YouHan on 2016/8/8.
 */
var pool = require('./../db/pool');
var mysql = require('mysql');

/**
 * for the event table bd handle
 */

//add function
exports.add = function (sid, name) {
    return new Promise(function (resolver, rejector) {
        if (!sid || !name) {
            rejector('no sid or no name');
        }
        pool.getConnection(function (err, conn) {
            if (err) {
                rejector('err happen when conn pool');
                throw err;
            }
            var sql = mysql.format("INSERT INTO tbl_event ('associate_id', 'name', 'create_time', " +
                "'update_time') VALUES (??, ??, ??, ??)", [sid, name, new Date(), new Date()]);
            conn.query(sql, function (err, rows) {
                if (err) {
                    rejector('err happen when execute sql');
                }
                resolver(rows);
            });
        });
    });
};

//update function
exports.update = function (id, sid, name) {
    return new Promise(function (resolver, rejector) {
        if (!id || !sid || !name) {
            rejector('no id or no sid or no name');
        }

        pool.getConnection(function (err, conn) {
            if (err) {
                rejector('err happen when connect db');
                throw err;
            }
            var sql = "UPDATE tbl_event SET sid = ??, name = ??, update_time = ??  WHERE id = ??";
            var inserts = [sid, name, new Date(), id];
            sql = mysql.format(sql, inserts);

            conn.query(sql, function (err, rows) {
                if (err) {
                    rejector('err when execute sql');
                    throw err;
                }
                resolver(rows);
            });
        });
    });
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
                sql = mysql.format("SELECT * from tbl_event where id= ??", [id]);
            } else {
                sql = mysql.format("SELECT * from tbl_event");
            }
            conn.query(sql, function (err, rows) {
                if (err) {
                    rejector('err when execute sql');
                    throw err;
                }
                resolver(rows);
            });
        });
    });
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
            var sql = mysql.format("DELETE FROM tbl_event WHERE id = ??", [id]);

            conn.query(sql, function (err, rows) {
                if (err) {
                    rejector('err happen when execute sql' + err);
                    throw err;
                }
                resolver(rows);
            });
        });
    });
};

