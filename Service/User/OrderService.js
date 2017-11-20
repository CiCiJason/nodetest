var OrderDetail = require("../../models/OrderDetail.js");

//
exports.OrderDetailModel = OrderDetail;

//获取最大的送样信息表号
exports.getorderId = function(callback) {

    OrderDetail.find({}, { 'orderId': 1 }).sort({ 'orderId': -1 }).then(function(data) {

        callback(true, data);

    });
}


//保存
exports.save = function(data, callback) {

        data.save().then(function(result) {
            if (result && result.result && result.result.ok == 1) {
                callBack(true, "新增成功");
            } else {
                callBack(false, "新增失败");
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
    }, function(err, data) {
        callback(false, "修改失败");
    });

}