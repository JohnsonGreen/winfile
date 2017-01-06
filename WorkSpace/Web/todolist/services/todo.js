/**
 * Created by cyh on 2017/1/6.
 */

var db=require('./db');

function Todo () {

}

Todo.get = function (id,callback) {
    var sql = 'select * from 3014218084_todo where id = ' + id;
    console.log(sql);
    db.query(sql, function (err, data) {
        callback(err,data);
    });
}


Todo.findAll = function (callback) {
    db.query('select * from 3014218084_todo',function (err, data) {
        callback(err,data);
    });
}

Todo.findByUserId = function (userid, callback) {
    var sql = 'select * from 3014218084_todo where user_id = \'' + userid + '\'';
    db.query(sql,function (err,data) {
        callback(err,data);
    })
}


Todo.add = function (todo,callback) {

    var sql = "insert into 3014218084_todo (user_id,set_time,start_time,content,estimated_time) values('"+todo.user_id+"','"+todo.set_time+"','"+todo.start_time+"','"+todo.content+"','"+todo.estimated_time+"')";
    db.query(sql,function (err,data) {
        callback(err,data);
    })
}


Todo.delete = function (id,callback) {
    var sql = "delete from 3014218084_todo where id =" + id;
    db.query(sql,function (err,data) {
        console.log(data);
        callback(err,data);
    })
}


module.exports = Todo;