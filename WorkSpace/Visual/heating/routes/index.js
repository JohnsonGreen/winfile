var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var db = require('./Db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {});
});



router.get('/date', function(req, res, next) {

    if(req.query.year != null && req.query.month != null){

        if(req.query.month < 10){
            req.query.month = '0' + req.query.month.toString();
        }
        var qstring = "SELECT  LNG,LAT  FROM  visual_heating WHERE WORKFORMID LIKE '"+ req.query.year.toString() + req.query.month.toString()+"%' ";
        console.log(qstring);

        db.query(qstring , function(err, data) {
            if (err) throw err;
            var place = ['河西区','河东区','南开区','河北区','红桥区','和平区'];

            var quer = "SELECT count(WORKFORMID)  AS cnt FROM visual_heating WHERE STANDARDADDRESS LIKE '"+place[0]+"%' AND  WORKFORMID LIKE '"+ req.query.year.toString() + req.query.month.toString()+"%' ";
            for(var i =1;i < place.length;i++){
                quer += ' UNION ' + "SELECT count(DISTINCT WORKFORMID) AS cnt FROM visual_heating WHERE STANDARDADDRESS LIKE '"+ place[i]+"%' AND  WORKFORMID LIKE '"+ req.query.year.toString() + req.query.month.toString()+"%' ";
            }
            console.log(quer);

            db.query(quer , function(er, d) {
                if (er) throw er;
                 var dt =[{},{}];
                 dt[0] = data;
                 dt[1] = d;
                res.json(dt);
            });
        });
    }
});

function querystring(problem,whe){

    var where='';
    if(whe != undefined){
        where = whe;
    }

    var qstring = " SELECT count(DISTINCT WORKFORMID) AS len  FROM  visual_heating WHERE (EVENTCAUSE LIKE '%"+ problem[0] +"%'";
    for(var i = 1;i < problem.length;i++){
        qstring +=  " OR EVENTCAUSE LIKE '%"+ problem[i] + "%'";
        if(i == problem.length - 1){
            qstring += ') ' + where;
        }
    }
    return  qstring;
}

router.get('/problem',function(req, res, next){

    //根据温度低、漏水、井盖丢失提取的关键词
    var  temperature = ['温','不热','凉','冷','冰凉','[:digit:]度'];
    var  leak = ['漏','冒','跑水','爆裂','破裂','断裂','爆管','爆','破','泡'];
    var  cover = ['井','丢','井盖'];

    var flag = 0;
    var where = null;
    if(req.query.year != null && req.query.month != null){
        if(req.query.month < 10){
            req.query.month = '0' + req.query.month.toString();
        }
        where = "AND WORKFORMID LIKE '"+ req.query.year.toString() + req.query.month.toString()+"%' ";
        flag = 1;
    }else if(req.query.year == null && req.query.month == null){

        flag = 0;
    }else if(req.query.year != null && req.query.month == null){
        where = "AND WORKFORMID LIKE '"+ req.query.year.toString()+"%' ";
        flag = 1;
    }else{

        if(req.query.month < 10){
            req.query.month = '0' + req.query.month.toString();
        }
        where = "AND WORKFORMID LIKE '"+ '____' + req.query.month.toString()+"%' ";
        flag = 1;
    }



    var qstring = null;
    var allProblems = temperature.concat(leak).concat(cover);
    var totalnum = 0;
    if(flag == 1){

        qstring = querystring(temperature,where) +' UNION ' + querystring(leak,where ) + ' UNION ' + querystring(cover,where ) +' UNION '+ querystring(allProblems,where );
        console.log(qstring);

    }else if(flag == 0){  //均为0
        qstring = querystring(temperature) +' UNION ' + querystring(leak) + ' UNION ' + querystring(cover) +' UNION '+ querystring(allProblems);
        console.log(qstring);
    }

        db.query(qstring , function(err, data) {
            if (err) throw err;
            switch(flag){
                case 0:
                    res.json(data);
                    break;
                case 1:
                    db.query("SELECT count(DISTINCT WORKFORMID) AS len FROM  visual_heating WHERE"+ where.slice(3) , function(err, da) {
                        if (err) throw err;

                        console.log("data: "+ data[3].len);

                        data[3].len = da[0].len - data[3].len;

                        if(data[3].len < 0){
                            data[3].len = 0;
                        }

                        console.log("da: "+ da[0].len);
                        res.json(data);
                    });
                    break;
            }
        });
});


module.exports = router;
