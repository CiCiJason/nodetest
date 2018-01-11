var User = require("../../models/User.js");
var bcrypt = require('bcrypt');


function InsertUser(data, callback) {

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
        var password = data.password ? data.password : data.oldpassword;
        var hash = finddata._doc.password;
        //var id1 = JSON.stringify({ id: finddata._id });
        //var id2 = JSON.parse(id1);
        var id = finddata._id;
        bcrypt.compare(password, hash, function(err, res) {
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

//通过ID更改
exports.updateById = function(id, data, callback) {

    User.update({ _id: id }, {
        accountname: data.accountname,
        username: data.username,
        email: data.email,
        tel: data.tel
    }).then(function(data) {
        callback(true, "修改成功");
    }, function(err, data) {
        callback(false, "修改失败");
    });

}

//一般更改
exports.update = function(accountname, newpassword, callback) {

    bcrypt.genSalt(12, function(err, salt) {
        bcrypt.hash(newpassword, salt, function(err, hash) {
            // Store hash in your password DB.
            User.update({ accountname: accountname }, {
                password: hash
            }).then(function(data) {
                callback(true, "修改成功");
            }, function(err, data) {
                callback(false, "修改失败");
            });

        });
    });

}