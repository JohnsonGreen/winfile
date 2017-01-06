/**
 * Created by cyh on 2017/1/5.
 */

// 连接MySQL
var mysql = require('mysql');
//创建数据库连接池
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todolist'
});

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}
exports.query = query;