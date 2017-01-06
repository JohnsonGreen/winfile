/**
 * Created by cyh on 2017/1/5.
 */

var express = require('express');
var router = express.Router();

var User = require('../services/user');
var helper = require('../services/helper');


//用户登录
router.post('/',function(req,res,next){

        var user = req.body;
        user.password = helper.encrypt(user.password);  //用户密码加密
        User.findByUsername(user.username,function (err, data) {
            if(err) {
                res.json({
                    error: "please try again !"
                });
            }

            if(data[0].password == user.password){
                res.json({
                    id:data[0].id,
                    username: data[0].username
                });
            }else{
                res.json({ error: "please check your password!"});
            }
        });
});



module.exports = router;

