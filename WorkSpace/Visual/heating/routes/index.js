var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var db = require('./Db.js');


//根据温度低、漏水、井盖丢失提取的关键词
var  temperature = ['温','不热','凉','冷','冰凉','[:digit:]度'];
var  leak = ['漏','冒','跑水','断裂','爆','破','泡'];
var  cover = ['井','丢','井盖'];


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {});
});

function group(pro){
      if(pro != null){
          var str ="  AND (EVENTCAUSE LIKE '%"+ pro[0] +"%'";
          for(var i = 1;i < pro.length;i++){
              str +=  " OR EVENTCAUSE LIKE '%"+ pro[i] + "%'";
              if(i == pro.length - 1){
                  str += ')  ';
              }
          }
          return str;
      }else{

          return '';
      }

}

router.get('/date', function(req, res, next) {

        var qstring = null;
        req.query.year = (req.query.year == null?  "____" : req.query.year.toString());
        req.query.month = (req.query.month == null?  '' :   req.query.month < 10 ?  '0' + req.query.month.toString(): req.query.month);

        var prob = null;
        if(req.query.problem != undefined){

            if(req.query.problem == '0'){
                prob = temperature;
            }else if(req.query.problem == '1'){
                prob = leak;
            }else{
                prob = cover;
            }
        }

       // console.log(req.query.month);

       var anStr = group(prob);

        qstring = "SELECT  LNG,LAT  FROM  visual_heating WHERE WORKFORMID LIKE '"+ req.query.year + req.query.month+"%' " +anStr;
        db.query(qstring , function(err, data) {
            if (err) throw err;
            var place = ['河西区','河东区','南开区','河北区','红桥区','和平区'];
            var quer = null;
                quer = "SELECT count(WORKFORMID)  AS cnt FROM visual_heating WHERE STANDARDADDRESS LIKE '" +
                    place[0] + "%' AND  WORKFORMID LIKE '" + req.query.year + req.query.month + "%' "+ anStr;

             for(var i =1;i < place.length;i++){
                 quer += ' UNION ALL ' + "SELECT count(WORKFORMID) AS cnt FROM visual_heating WHERE STANDARDADDRESS LIKE '"+
                     place[i]+"%' AND  WORKFORMID LIKE '"+ req.query.year + req.query.month+"%' "+anStr;
            }

            db.query(quer , function(er, d) {
                if (er) throw er;
                 var dt =[{},{}];
                 dt[0] = data;
                 dt[1] = d;
                res.json(dt);
            });
        });
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

    var place = ['河西区','河东区','南开区','河北区','红桥区','和平区'];
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

        qstring = querystring(temperature,where) +' UNION ALL' + querystring(leak,where ) + ' UNION  ALL ' + querystring(cover,where ) +' UNION  ALL '+ querystring(allProblems,where );


    }else if(flag == 0){  //均为0
        qstring = querystring(temperature) +' UNION  ALL ' + querystring(leak) + ' UNION  ALL ' + querystring(cover) +' UNION  ALL '+ querystring(allProblems);

    }
        db.query(qstring , function(err, data) {
            if (err) throw err;
            switch(flag){
                case 0:
                    data[3].len = 10767 - data[3].len;
                    res.json(data);
                    break;
                case 1:
                    db.query("SELECT count(DISTINCT WORKFORMID) AS len FROM  visual_heating WHERE"+ where.slice(3) , function(err, da) {
                        if (err) throw err;


                        data[3].len = da[0].len - data[3].len;
                        if(data[3].len < 0){
                            data[3].len = 0;
                        }
                        res.json(data);
                    });
                    break;
            }
        });
});


//为曲线构造sql语句
function querystringLine(year,problem){

    var where = '';
    var month = [];
    for(var i = 1; i <= 12; i++ ){
        if(i < 10){
            month[i] = '0'+i;

        }else{
            month[i] = i.toString();
        }

        var whe = null;
        if(year == null){
            whe  = "AND WORKFORMID LIKE '"+ "____" + month[i]+"%' ";
        }else{
            whe  = "AND WORKFORMID LIKE '"+ year.toString() + month[i]+"%' ";
        }

        if(i == 12){
            where += querystring(problem,whe);
        }else{
            where +=  querystring(problem, whe) + ' UNION ALL ';
        }

    }

        //querystring(leak,whe) + querystring(cover,whe);

    return  where;
}


router.get('/line',function(req,res,next){

    //console.log(querystringLine(req.query.year,temperature));

    db.query(querystringLine(req.query.year,temperature),function(err,data){
        db.query(querystringLine(req.query.year,leak),function(err,data){
            db.query(querystringLine(req.query.year,cover),function(err,data){

                res.json(data);
            });

        });

    });

});

module.exports = router;
