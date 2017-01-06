/**
 * Created by cyh on 2017/1/5.
 */

var db=require('./db');

function User () {

}

User.get = function (id,callback) {
    var sql = 'select * from 3014218084_user where id = ' + id;
    console.log(sql);
    db.query(sql, function (err, data) {
        callback(err,data);
    });
}

User.findAll = function (callback) {
    db.query('select * from 3014218084_user',function (err, data) {
        callback(err,data);
    });
}

User.findByUsername = function (username, callback) {
    var sql = 'select * from 3014218084_user where username = \'' + username + '\'';
    db.query(sql,function (err,data) {
        callback(err,data);
    })
}

User.add = function (user,callback) {
    var sql = "insert into 3014218084_user (username,password) values ('"+user.username+"','"+user.password+"')";
    db.query(sql,function (err,data) {
        console.log(data);
        callback(err,data);
    })
}

User.delete = function (id,callback) {
    var sql = "delete from 3014218084_user where id =" + id;
    db.query(sql,function (err,data) {
        console.log(data);
        callback(err,data);
    })
}


module.exports = User;