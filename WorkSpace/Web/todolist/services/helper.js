/**
 * Created by cyh on 2017/1/5.
 */

var crypto = require('crypto');  //加载crypto库

//加密密码
function encrypt(content){
    var md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    md5.update(content);
    var d = md5.digest('hex');  //加密后的值d
    return d;
}

//检查输入是否合法
function check(key,value){
    if(value == null){
        return false;
    }
    switch(key){
        case 'username':
            return true;
            break;
        case 'password':
            return true;
            break;
        default:
            return true;
            break;
    }
}

exports.encrypt=encrypt;
exports.check=check;