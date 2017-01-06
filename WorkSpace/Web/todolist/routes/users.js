var express = require('express');
var router = express.Router();

var User = require('../services/user');
var helper = require('../services/helper');


/* GET users listing. */

router.post('/', function(req, res, next) {

    var user = req.body;

    // console.log("req.body  "+ req.body);   不能打印，打印会出500错误

    console.log("user.password  "+ user.password);
    console.log("user.username  "+ user.username);

    if(helper.check('username',user.username) && helper.check('password',user.password)){
        user.password = helper.encrypt(user.password);  //用户密码加密
        User.add(user,function (err, data) {
            if(err) throw err;
            res.json({id: data.insertId});
        });
    } else{
        res.json({ error: "username or password is not standard!"});
    }
});

router.get('/',function(req,res,next){

    if(req.query.username!=null){
        User.findByUsername(req.query.username,function (err,data) {
            if (err) {
                console.log('User.find error!');
            }
            console.log(data);
            res.json(data);
        })
    }else{
        res.json({
            error: "You  need  give a username!"
        });
    }

});

router.get('/:id',function(req,res,next){

    if(req.params.id != null){
        User.get(req.params.id,function (err,data) {
            if (err) {
                console.log('User.find error!');
            }
            console.log(data);
            res.json(data);
        })
    }else{
        res.json({
            error: "You  need  give a username!"
        });
    }

});

module.exports = router;
