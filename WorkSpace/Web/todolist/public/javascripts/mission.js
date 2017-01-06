/**
 * Created by cyh on 2017/1/6.
 */
$(function(){

   // $('#timepicker1').timepicker();

    /********************** 推测时间段选择开始 ***************************/
    $('#hour .btn:first-of-type').on('click', function() {
        $('#hour input').val( parseInt($('#hour input').val(), 10) + 1);
    });
    $('#hour .btn:last-of-type').on('click', function() {
        var hour = parseInt($('#hour input').val(), 10);
        if(hour > 0){
            $('#hour input').val( hour - 1);
        }
    });

    $('#minute .btn:first-of-type').on('click', function() {
        var minute = parseInt($('#minute input').val(), 10);
        if( minute < 59){
            $('#minute input').val( minute + 1);
        }
    });
    $('#minute .btn:last-of-type').on('click', function() {
        var minute = parseInt($('#minute input').val(), 10);
        if(minute > 0){
            $('#minute input').val( minute - 1);
        }

    });
    /********************** 推测时间段选择结束 ***************************/

    /*************************时间处理函数******************************************/

        //时间戳转换为标准格式 2017-1-7 10:24
    var formatDateTime = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return y + '-' + m + '-' + d+' '+h+':'+minute;
    };


    function add0(m){return m<10?'0'+ m:m }

    //返回 HH:MM
    function stampToDate(stamp){

        var time = new Date(stamp);
        var h = time.getHours();
        var m = time.getMinutes();
        return add0(h) + ":" + add0(m);
    }

    function  secondsToHour(seconds){
        var h = Math.floor(seconds/3600);
        var m = Math.ceil((seconds - h * 3600) / 60);
        return  h + " hours      " + m+" minutes";
    }

    function  getLeftDate(start_time, estimated_time){

        var current = Date.parse(new Date()) / 1000;
        var left = start_time - current + estimated_time;
        var str = '';
        if(left < 0){
            str = '-';
            left = Math.abs(left);
        }
        left = parseInt(left);
        var h = add0(Math.floor(left/3600));
        var m = add0(Math.floor((left - h * 3600) / 60));
        var s = add0(Math.floor(left % 60));

       return  str += h + 'h  '+  m  +  'm  ' + s + 's ';

    }
     function endOfToday(){
        return  (new Date(new Date().toLocaleDateString()).getTime() + 24*60*60*1000-1) / 1000;  //当天时间晚间11:59
     }

    /*************************时间处理函数******************************************/


    /*************************今日明日及所有的条目开始************************************/
      var user_id = 30;
      var today_time = Math.floor(endOfToday());
      var tomorrow_time = Math.floor(today_time + 3600*24);

      var intervalId = [];
      function clearAllInterval(){
         for(var i = 0; i <intervalId.length; i++ ){
            clearInterval(intervalId[i]);
        }
        intervalId = [];
      }

      $('#today').click(function(){
          if($(this).parent().hasClass('active')){
          }else{
              clearAllInterval();
              $('tbody tr:first').nextAll().remove();

              $.get('/api/todos/'+ user_id+'/'+today_time, function(data){
                  appendHtml(data);
              });
              var parent = $(this).parent();
              parent.addClass('active').siblings().each(function(){
                   $(this).removeClass('active');
              });
          }
      });
      $('#today').removeClass('active');
      $('#today').trigger('click');     //初始点击


    $('#tomorrow').click(function(){
        if($(this).parent().hasClass('active')){

        }else{
            clearAllInterval();
            $('tbody tr:first').nextAll().remove();
            $.get('/api/todos/'+ user_id+'/'+tomorrow_time, function(data){
                appendHtml(data);
            });
            var parent = $(this).parent();
            parent.addClass('active').siblings().each(function(){
                $(this).removeClass('active');
            });
        }
    });




    $('#all').click(function(){
        if($(this).parent().hasClass('active')){
        }else{
            clearAllInterval();
            $('tbody tr:first').nextAll().remove();

            console.log($('tbody:first')[0]);

            $.get('/api/todos/'+ user_id, function(data){
                appendHtml(data);
            });
            var parent = $(this).parent();
            parent.addClass('active').siblings().each(function(){
                $(this).removeClass('active');
            });
        }
    });

    /*************************今日明日及所有的条目结束************************************/



    /***************************新建任务提交开始*******************************/

     function appendHtml(todos){
           $('#nothing-remind').remove();
           if(todos.length == 0){
               $('#mission-container').append(

                   '<div id="nothing-remind" style="width:100%;display:inline-block;text-align:center">' +
                       '<h2>There is nothing，try to add a new thing ╮(╯▽╰)╭</h2>'+
                   '</div>'
                );
               $('#delete-things').hide();
               $('#done-things').hide();

           }else{

               $('#delete-things').show();
               $('#done-things').show();

               for(var todo in todos){

                   var start_time = stampToDate(parseInt(todos[todo].start_time));
                   var estimated_time = secondsToHour(parseInt(todos[todo].estimated_time));
                   var left_time = getLeftDate(parseInt(todos[todo].start_time),parseInt(todos[todo].estimated_time));

                   $('.table').append('<tr name='+todos[todo].id+'>'+
                       '<td>'+
                       '<div id="'+ todos[todo].set_time + '"  itemid="'+todos[todo].id+'" class="checkbox" style="margin-top:0px; margin-bottom:0px">' +
                       '<label >'+
                       '<input itemid="'+todos[todo].id+'" type="checkbox" >'+
                       '</label>'+
                       '</div>'+
                       '</td>'+
                       '<td>'+ todos[todo].content +'</td><td>' + start_time + '</td><td>'+ estimated_time+ '</td><td><span id="item'+ todos[todo].id + '" >'+ left_time + '</span></td>'+
                       '</tr>');

               }
               var interId = setInterval(function(){
                   for(var todo in todos) {
                       $('#item' + todos[todo].id).html(getLeftDate(parseInt(todos[todo].start_time), parseInt(todos[todo].estimated_time)));
                   }
               },1000);
               intervalId.push(interId);
           }



      }


    $("#addMissionButton").click(function(){
        var content = $('#addMission textarea').val();
        if(!content){
            $('#addMissRem').removeClass('.success-letter').css({color:"#b94a48"}).html("Content can't be null").show();


            var x =  (new Date(new Date().toLocaleDateString()).getTime() + 24*60*60*1000-1) / 1000;  //当天时间晚间11:59
            var timestamp = Date.parse(new Date());

            console.log("x : " + x);
            console.log("timestamp : " + timestamp);
            console.log("小时 : " + (x - timestamp/1000)/3600);

        }else{
           if(content.length > 100){
               $('#addMissRem').removeClass('.success-letter').css({color:"#b94a48"}).html("Content' length can't be more than 100 !").show();
           }else{

               $('#addMissRem').removeClass('.success-letter').html("");

               var minute = parseInt($('#minute input').val(), 10);
               var hour = parseInt($('#hour input').val(), 10);

               // 获取某个时间格式的时间戳
               var timestamp= Date.parse(new Date($(".form_datetime").val())) / 1000 ;
               var interval = minute * 60 + hour * 3600;

               $.post('/api/todos',{
                   start_time: timestamp,
                   estimated_time : interval,
                   content : content,
                   user_id: 30
               },function(data){
                   if(!data.error){
                      console.log("返回值：  " + data);

                       $("#modal-close").trigger('click');     //关闭表单
                       $('.remind').hide();   //隐藏所有提示

                       var todos = { 0: data};
                       appendHtml(todos);    //添加新增项

                       $('.alert>span').html('<strong>Add SUCCESS !  </strong>').show();
                       $('.alert').removeClass('alert-warning').addClass('alert-success').slideDown(600);
                       setTimeout(function(){
                           $('.alert').slideUp(600);
                       },3000);

                   }else{
                       $('#addMissRem').removeClass('.success-letter').css({color:"#b94a48"}).html(data.error).show();
                   }
               });
           }
        }
    });

    /***************************新建任务提交结束*******************************/


    /***************************删除与完成按钮开始*******************************/

      function checkAllBox(){
          var itemArray = [];
        $('.table  input:not(:first)').each(function(){

              if($(this).is(':checked')){
                  itemArray.push($(this).attr('itemid'));
              }
        });

        console.log(itemArray);
        return itemArray;
    }

    function checkBoxEmpty(){
          console.log("$('.table  input').length"+ $('.table  input').length)
        if($('.table  input').length == 1){

              console.log([].length);
            appendHtml([]);
        }
    }


    function deleteOrDone(type){

        var choose = '';
        var sucRemind = '';
        var failRemind=''
        switch(type){
            case 'delete':
                choose='delete';
                sucRemind='DELETE SUCCESS !  ';
                failRemind='Please choose an item to delete!';
                break;
            case 'done':
                choose='patch';
                sucRemind='DONE SUCCESS !  ';
                failRemind='Please choose an item to make it finished!';
                break;
        }

        var itemArray = checkAllBox();
        if(itemArray.length != 0){
            for(var id in itemArray){

                $.ajax({
                    type: choose,
                    url: '/api/todos/'+ user_id + '/'+ itemArray[id],
                    success: function (data){
                        if(! data.error){

                        }
                    }
                });
                $('tr[name="'+itemArray[id]+'"]').remove();
            }
            $('.alert>span').html('<strong>'+sucRemind+'</strong>').show();
            $('.alert').removeClass('alert-warning').addClass('alert-success').slideDown(600);
            setTimeout(function(){
                $('.alert').slideUp(600);
            },3000);

            checkBoxEmpty(); //检查列表是否为空
        }else{
            $('.alert>span').html('<strong>'+failRemind+'</strong>').show();
            $('.alert').removeClass('alert-success').addClass('alert-warning').slideDown(600);
            setTimeout(function(){
                $('.alert').slideUp(600);
            },3000);
        }
    }

     $('#delete-button').click(function(){
          deleteOrDone('delete');
     });

    $('#done-button').click(function(){
        deleteOrDone('done');
    });

    /***************************删除与完成按钮结束*******************************/




});