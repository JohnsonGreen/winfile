/**
 * Created by cyh on 2017/1/5.
 */
$(function(){
    //验证输入条目是否均可行
    var inputReg,inputLog;

    function inputRegInit(){
        inputReg={
            username:false,
            password:false,
            passConfirm:false
        };
    }

    function inputLogInit(){
        inputLog={
            username:false,
            password:false
        };
    }

    function checkInputReg(){
        for(var item in inputReg){
            if(! inputReg[item]){
                return false;
            }
        }
        return true;
    }
    function checkInputLog(){
        for(var item in inputLog){
            if(! inputLog[item]){
                return false;
            }
        }
        return true;
    }


    //检查输入是否合法
    function check(key,value){
        if(value == null){
            return {error: "value can't be null"};
        }
        switch(key){
            case 'username':
                if(value.length >= 10){
                    return {error: "no more than 10 chars"};
                }
                if(! ((/^([a-z\u4E00-\u9FA5])+$/i).test(value))){
                    return {error: "Only Chinese or English letters are allowed !"};
                }
                return  {success: "success"};
                break;
            case 'password':
                if(value.length < 6 || value.length > 12 ){
                    return {error: "Must over 6 chars and no more than 12"};
                }
                if(!((/^[a-zA-Z0-9]+$/).test(value))){
                    return {error: "Only English letters or numbers are allowed !"};
                }
                return  {success: "success"};
                break;
            default:
                return true;
                break;
        }
    }

    //初始化检查变量
    inputRegInit();
    inputLogInit();

    //关闭登陆注册框
    $(".login-close").click(function(){
        $('.register').hide();
        $('.login').hide();
        $("#login").slideUp(10);
    });
    //开启登录注册
    $('#start-btn').click(function(){
        $("#login").slideDown(1000);
        $('.login').show();
    });

    //切换注册与登录
    $('#register-btn').click(function(){
        $('.login').hide();
        $('.register').show();
    });
    $('#login-btn').click(function(){
        $('.register').hide();
        $('.login').show();
    });


    /*************************用户登录开始*******************************/

    $('input[name="loguser"]').keyup(function(){
        var username = $(this).val();
        var loguser = $(this);
        if(!!username){
            $.get("/api/users?username=" + username,function(data,status){
                if(data.error){
                    inputReg.username = false;
                    loguser.siblings().removeClass('success-letter').addClass('error-letter').html(data.error).show();
                }else{
                    if(data.length > 0){
                        inputLog.username = true;
                        loguser.siblings().removeClass('error-letter').addClass('success-letter').html("You can use this!").show();
                    }else{
                        inputLog.username = false;
                        loguser.siblings().removeClass('success-letter').addClass('error-letter').html('user name is not existed！').show();
                    }
                }
            });
        }else{
            inputLog.username = false;
            loguser.siblings().removeClass('success-letter').addClass('error-letter').html('Please input a user name !').show();
        }
    });

    //密码存在
    (function(){
        $('input[name="loguser"]').keyup(function(){
           var logpas =  $(this).val();
            if(!!logpas){
                inputLog.password = true;
                $(this).siblings().removeClass('error-letter').addClass('success-letter').html('').show();

            }else{
                inputLog.password = false;
                $(this).siblings().removeClass('success-letter').addClass('error-letter').html('Please input a user name !').show();
            }
        });
    })();


    //用户登录
    $('#login-button').click(function(){
        var user = $('input[name="loguser"]').val();
        var pass = $('input[name="logpas"]').val();
        if(checkInputLog()){
            $.post('/api/sessions',{
                username : user,
                password : pass
            },function(data){
                if(! data.error){

                    $('#login-form')[0].reset();         //清空表单数据
                    $(".login-close").trigger('click');     //关闭表单
                    $('.remind').hide();   //隐藏所有提示
                    inputLogInit();      //重新初始化所有检查变量
                    //setCookie('user_name',data.username,1); //设置cookie
                    setCookie('user_id_3014218084',data.id,1); //设置cookie
                    user_name = data.username;
                    user_id = data.id;

                    $('.alert>span').html('<strong>Login SUCCESS !  Congratulations!</strong> You can enjoy our service NOW !').show();
                    $('.alert').removeClass('alert-warning').addClass('alert-success').slideDown(600);
                    setTimeout(function(){
                        $('.alert').slideUp(600);
                    },3000);

                    $('#home').slideUp(600);
                    setTimeout(function(){
                        $('#list-table').slideDown(600);
                    },1000);

                    $('#welcome').html('Welcome <strong>'+ data.username+'</strong>');
                    $('nav').slideDown(600);

                }else{
                    $('#login-form  .error>span').removeClass('success-letter').addClass('error-letter').html(data.error).show();
                    $('#login-form  .error').show();
                }
            });
        }else{
            $('#login-form  .error>span').removeClass('success-letter').addClass('error-letter').html('please check your input').show();
            $('#login-form  .error').show();
        }
        return false;
    });

    $('#home').slideDown(600);

    checkCookie();

    /**************************用户登录结束**********************************/


    /**************************用户注册开始********************************/
    //检查数据库是否包含用户
    $('input[name="reguser"]').keyup(function(){

        var username = $(this).val();
        var res = check("username",username);
        var reguser = $(this);

        if(res.error){

            inputReg.username = false;
            reguser.siblings().removeClass('success-letter').addClass('error-letter').html(res.error).show();

        }else{
            $.get("/api/users?username=" + username,function(data,status){
                if(data.error){
                    inputReg.username = false;
                    reguser.siblings().removeClass('success-letter').addClass('error-letter').html(data.error).show();
                }else{
                    if(data.length > 0){
                        inputReg.username = false;
                        reguser.siblings().removeClass('success-letter').addClass('error-letter').html("User name already exists!").show();
                    }else{
                        inputReg.username = true;
                        reguser.siblings().removeClass('error-letter').addClass('success-letter').html('you can use this name！').show();
                    }
                }
            });
        }
    });

    //密码
    $('input[name="regpas"]').keyup(function(){
        var pass = $(this).val();
        var res = check("password",pass);
        if(res.error){
            inputReg.password = false;
            $(this).siblings().removeClass('success-letter').addClass('error-letter').html(res.error).show();
        }else{
            inputReg.password = true;
            $(this).siblings().removeClass('error-letter').addClass('success-letter').html("You can use it ").show();
        }
    });

    //验证密码
    $('input[name="regpasconfirm"]').keyup(function(){

        var pass =  $('input[name="regpas"]').val();
        var passConfirm = $(this).val();

        if(pass.length == passConfirm.length){
            if(pass == passConfirm){
                inputReg.passConfirm = true;
                $(this).siblings().removeClass('error-letter').addClass('success-letter').html('You can use it ').show();
            }else{
                inputReg.passConfirm = false;
                $(this).siblings().removeClass('success-letter').addClass('error-letter').html("The passwords you typed do not match").show();
            }
        }else{
            inputReg.passConfirm = false;
            $(this).siblings().removeClass('success-letter').addClass('error-letter').html("The passwords you typed do not match").show();
        }

    });

    //用户注册按钮
    $('#register-button').click(function(){
        var reguser = $('input[name="reguser"]').val();
        var regpas = $('input[name="regpas"]').val();

        if(checkInputReg()){
            $.post('/api/users',{
                username:reguser,
                password:regpas
            },function(data){
                if(! data.error){

                    $('#register-form')[0].reset();         //清空表单数据
                    $(".login-close").trigger('click');     //关闭表单
                    $('.remind').hide();   //隐藏所有提示
                    inputRegInit();      //重新初始化所有检查变量

                    $('.alert>span').html('<strong>RGISTER SUCCESS !  Congratulations!</strong> You can login and enjoy our service NOW !').show();
                    $('.alert').removeClass('alert-warning').addClass('alert-success').slideDown(600);
                    setTimeout(function(){
                        $('.alert').slideUp(600);

                        $('input[name="loguser"]').val(reguser);
                        $('input[name="loguser"]').trigger('keyup');
                        $('#start-btn').trigger('click');
                        $('input[name="logpas"]').focus();

                    },3000);

                }else{
                    $('#register-form  .error>span').removeClass('success-letter').addClass('error-letter').html('please try again !').show();
                    $('#register-form  .error').show();
                }
            });
        }else{
            $('#register-form  .error>span').removeClass('success-letter').addClass('error-letter').html('please check your input').show();
            $('#register-form  .error').show();
        }
        return false;
    });

    $('#logout').click(function(){
        delCookie('user_id_3014218084');

        $('.alert>span').html('<strong>LogOut SUCCESS!</strong> good bye').show();
        $('.alert').removeClass('alert-warning').addClass('alert-success').slideDown(600);
        setTimeout(function(){
            $('.alert').slideUp(600);
        },3000);

        $('nav').slideUp(600);
        setTimeout(function(){
            $('#list-table').slideUp(600);
        },1000);

        console.log('user_name:  '+ user_name);
        $('#home').slideDown(600);
        user_name='';
        user_id='';



    });

    /**************************用户注册结束********************************/

    /**************************本地cookie操作开始*********************************/

    function getUser(){

    }

    var c_start='';
    var c_end =''
    function setCookie(c_name,value,expiredays)
    {
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" +escape(value)+
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }

    function getCookie(c_name)
    {
        if (document.cookie.length>0)
        {
            c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1)
            {
                c_start=c_start + c_name.length+1
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    }

    function checkCookie()
    {
        //user_name=getCookie('user_id');
        user_id=getCookie('user_id_3014218084');
        if (user_id !=null && user_id !="")
        {

            $.get('/api/users/'+ user_id,function(data){
                user_name= data[0].username;
                setCookie('user_id_3014218084',user_id,1); //设置cookie

                $('.alert>span').html('<strong>Welcome Back!</strong> You can enjoy our service NOW !').show();
                $('.alert').removeClass('alert-warning').addClass('alert-success').slideDown(600);
                setTimeout(function(){
                    $('.alert').slideUp(600);
                },3000);

                $('#home').slideUp(600);
                setTimeout(function(){
                    $('#list-table').slideDown(600);
                },1000);

                $('#welcome').html('Welcome <strong>'+user_name+'</strong>');
                console.log('user_name:  '+ user_name);

                $('nav').slideDown(600);
            });

        }
        else
        {

        }
    }

    function delCookie(name)
    {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }


    /****************************本地cookie操作结束*******************************/


});