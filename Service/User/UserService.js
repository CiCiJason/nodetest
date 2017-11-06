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

function InsertUser(data) {
    var userInsert = Object.assign({}, new User({ accountname: data.accountname, email: data.email, password: data.password }));
    bcrypt.hash(userInsert.password, 12, function(hash) {
        return userInsert.sava();
    });
}

//注册
exports.SignUp = function(data) {
    User.findOne({ "$or": [{ 'accountname': data.accountname }, { 'email': data.email }] }, function(finddata) {
        if (finddata) {
            console.log(finddata);
            InsertUser(data);
        } else {
            return "用户名或者邮箱已经被注册";
        }
    });
}

//登录
exports.SignIn = function(data) {
    var password = bcrypt.hash(data.password, 12);

    User.find({ "$or": [{ 'accountname': data.accountname, 'password': password }, { 'email': data.email, 'password': password }] }, function(finddata) {
        if (finddata) {
            return true; //登录成功
        } else {
            return false; //登录失败
        }
    });
}

// exports.checkPwd = function(data, callBack) {
//     var lastPwd = data.body.lastPwd;
//     var Account = data.session.Account ? data.session.Account : "";
//     User.getUserByName(Account).then(function(result) {
//         if (result && result.created_at) {
//             User.fetch({ Account: Account, Pwd: salt.encrypt(lastPwd, result.salt) }).then(function(result) {
//                 if (result && result.length > 0) {
//                     callBack(true, "登录成功");
//                 } else {
//                     callBack(false, "用户名或密码不正确");
//                 }
//             })
//         } else {
//             callBack(false, "用户名或密码不正确");
//         }
//     });
// }