/**
 * Created by cyh on 2017/1/6.
 */

var express = require('express');
var router = express.Router();

var User = require('../services/user');
var helper = require('../services/helper');
var Todo = require('../services/todo');


router.post('/', function(req, res, next) {

    var thing = req.body;

    console.log("user.password  "+ thing.start_time);
    console.log("user.username  "+ thing.estimated_time);
    console.log("user.username  "+ thing.content );
    console.log("user.username  "+ thing.user_id );

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


});


router.get('/:user_id', function(req, res, next) {
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


});

module.exports = router;