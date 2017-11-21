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
exports.save = function(data, callBack) {

        data.save().then(function(result) {
            if (result) {
                callBack(true, result._id);
            } else {
                callBack(false, "新增失败");
            }
        });

    }
    //获取默认的orderId
exports.getorderId = function(callBack) {

    OrderDetail.find().sort({ 'orderId': -1 }).then(function(finddata) {
        if (finddata) {
            callBack(true, finddata[0].orderId);
        } else {
            callBack(false, "新增失败");
        }
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

//获取送样信息列表
exports.getOrderLists = function(id, callback) {

    OrderDetail.find({ accountName: id }).sort({ "createDate": -1 }).then(function(data) {
        callback(true, data);
    }, function(err, data) {
        callback(false, "查找失败");
    });

}