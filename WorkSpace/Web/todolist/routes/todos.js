/**
 * Created by cyh on 2017/1/6.
 */

var express = require('express');
var router = express.Router();

var User = require('../services/user');
var helper = require('../services/helper');
var Todo = require('../services/todo');


router.post('/', function(req, res, next) {

    if(helper.checkLogin()){
        var thing = req.body;
        if(!! thing.start_time &&  !! thing.estimated_time && !! thing.content &&  !!thing.user_id){

            thing.set_time =  Date.parse(new Date()) / 1000;

            Todo.add(thing,function(err,data){
                if(err){
                    res.json({ error:"please try again !"});
                }else{
                    thing.id = data.insertId;
                    res.json(thing);
                }
            });
        }else{
            res.json({ error: "please check your input!"});
        }
    }else{
        res.json({ error: "please check your input!" ,login:1});
    }



});


router.get('/:user_id', function(req, res, next) {

    if(helper.checkLogin()){
     var user_id = req.params.user_id;
     console.log(user_id);
     if(user_id){
        Todo.findByUserId(user_id,function(err,data){
           if(err){
               res.json({ error:"please try again !"});
           } else{
               res.json(data);
           }

        });
      }else{
         res.json({ error:"data not found !"});
     }
    }else{
        res.json({ error: "please check your input!" ,login:1});
    }
});

router.get('/:user_id/finished/:finished', function(req, res, next) {

    if(helper.checkLogin()){
    var user_id = req.params.user_id;
    var finished = req.params.finished;
     console.log('finished' + finished);
    if(user_id && finished){
        if(finished == 1){
            Todo.findByUserIdDone(user_id,function(err,data){
                console.log(data);
                if(err){
                    res.json({ error:"please try again !"});
                } else{
                    res.json(data);

                }
            });
        }else{
            res.json({ error:"data not found !"});
        }
    }else{
        res.json({ error:"data not found !"});
    }
    }else{
        res.json({ error: "please check your input!" ,login:1});
    }
});


router.get('/:user_id/:endTime',function(req,res,next){

    if(helper.checkLogin()){
    var user = {};
    user.user_id = req.params.user_id;
    user.endTime = req.params.endTime;

    console.log("user.user_id" + user.user_id );
    console.log(" user.endTime" +  user.endTime );

     if( user.user_id && user.endTime){
         Todo.findByUserIdTime(user,function(err,data){
             if(err){
                 res.json({ error:"please try again !"});
             } else{
                 res.json(data);
             }
         });
     }else{
         res.json({ error:"data not found !"});
     }
    }else{
        res.json({ error: "please check your input!" ,login:1});
    }

});

router.delete('/:user_id/:id', function(req, res, next) {
    if(helper.checkLogin()){
    var ids = {};
    ids.id = req.params.id;
    ids.user_id = req.params.user_id;

    Todo.delete(ids,function (err,data) {
        if (err) {
            res.json({ error:"please try again !"});
        }else{
            res.json(data);
        }

    });

    }else{
        res.json({ error: "please check your input!" ,login:1});
    }
});


router.patch('/:user_id/:id', function(req, res, next) {
    if(helper.checkLogin()){
    var ids = {};
    ids.id = req.params.id;
    ids.user_id = req.params.user_id;

    Todo.patch(ids,function (err,data) {
        if (err) {
            res.json({ error:"please try again !"});
        }else{
            res.json(data);
        }

    });
    }else{
        res.json({ error: "please check your input!" ,login:1});
    }
});



module.exports = router;