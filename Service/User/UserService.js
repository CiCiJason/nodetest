var User = require("../../models/User.js");
var bcrypt = require('bcrypt');
//var mongo = require('mongodb');


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

    // bcrypt.hash(data.password, 12, function(err, hash) {
    //     var userInsert = new User({ accountname: data.accountname, email: data.email, password: hash });
    //     userInsert.save().then(function(result) {
    //         callback(result);
    //     });
    // });
    bcrypt.genSalt(12, function(err, salt) {
        bcrypt.hash(data.password, salt, function(err, hash) {
            // Store hash in your password DB.
            var userInsert = new User({ accountname: data.accountname, email: data.email, password: hash });
            userInsert.save().then(function(result) {
                callback(result);
            });
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

    User.findOne({ accountname: data.accountname }).then(function(finddata) {
        var hash = finddata._doc.password;
        //var id1 = JSON.stringify({ id: finddata._id });
        //var id2 = JSON.parse(id1);
        var id = finddata._id;
        bcrypt.compare(data.password, hash, function(err, res) {
            if (res == true) {
                return callback(true, "登录成功", id);
            } else {
                return callback(false, "账户名或者密码错误", null);

            }
        });
    });
}

exports.getById = function(data, callback) {

    User.findById({ _id: data }).then(function(result) {
        callback(true, result._doc);
    });

}

//更新更改之后的信息
exports.updateById = function(id, data, callback) {

    User.update({ _id: id }, {
        accountname: data.accountname,
        username: data.username,
        email: data.email,
        tel: data.tel
    }).then(function(data) {
        callback(true, "修改成功");
    });

}