var User = require("../../models/User.js");
var bcrypt = require('bcrypt');

// function ValidationUserName(data, callback, next, Validation) {
//     User.getSingleUser({ 'accountname': data.accountname }, function(finddata) {
//         if (finddata) {
//             //callback(false, '用户名已经存在');
//             return false;
//         } else {
//             //Validation(next, data, callBack, Validation);
//             return true; //用户名不存在，可以注册
//         }

//     });
// }

// function ValidationEmail(data, callback, next, Validation) {
//     User.findOne({ 'email': data.email }, function(finddata) {
//         if (finddata) {
//             // callback(false, '邮箱已经存在');
//             return false;
//         } else {
//             //Validation(next, data, callBack, Validation);
//             return true; //邮箱不存在，可以注册
//         }

//     });
// }

function InsertUser(data, callback) {

    bcrypt.hash(data.password, 12, function(err, hash) {
        var userInsert = new User({ accountname: data.accountname, email: data.email, password: hash });
        userInsert.save().then(function(result) {
            callback(result);
        });
    });
}

//注册
exports.SignUp = function(data, callback) {
    User.find({ $or: [{ 'accountname': data.accountname }, { 'email': data.email }] }, function(err, finddata) {
        if (!finddata.length) {
            InsertUser(data, function(result) {
                return callback(true, "注册成功");
            });
        } else {
            return callback(false, "用户名或者邮箱已经被注册");
        }
    });
}

//登录
exports.SignIn = function(data, callback) {

    bcrypt.hash(data.password, 12, function(err, hash) {
        //data.password = hash;
        User.find({ accountname: data.accountname, password: hash }, function(err, finddata) {
            if (!finddata.length) {
                return callback(true, "登录成功");
            } else {
                return callback(false, "账户名或者密码错误");
            }
        });
    });
}