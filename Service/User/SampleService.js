var Sample = require("../../models/Sample.js");

exports.SampleModel = Sample;

//新增地址
exports.save = function(data, callBack) {

        data.save().then(function(result) {
            if (result && result._doc) {
                callBack(true, "新增成功");
            } else {
                callBack(false, "新增失败");
            }
        });

    }
    //
    // exports.getorderId = function(data, callback) {

//     Sample.find().sort({ 'orderId': -1 }).then(function(finddata) {

//         if (finddata) {
//             var orderId = finddata[0].orderId;
//             callBack(true, orderId);
//         } else {
//             callBack(false, "新增失败");
//         }


//     });
// }

//编辑更改地址
exports.updateById = function(id, data, callback) {

        Sample.update({ _id: id }, {
            country: data.country,
            province: data.province,
            city: data.city,
            district: data.district,
            detailedAddress: data.detailedAddress,
            ZipCode: data.ZipCode,
            contactPerson: data.contactPerson,
            contactTel: data.contactTel,
            accountName: data.accountName
        }).then(function(data) {
            callback(true, "修改成功");
        });

    }
    //删除地址
exports.deleteById = function(id, callback) {

        Sample.remove({ _id: id }).then(function(data) {
            callback(true, "删除成功");
        });

    }
    //设置默认地址
exports.updateDefaultAddress = function(userid, addressId, callback) {

    Sample.updateMany({ accountName: userid }, { $set: { asDefaultAddress: false } }).then(function(err, data) {
        //console.log(1);
        Sample.update({ _id: addressId }, { $set: { asDefaultAddress: true } }).then(function(err, data) {
            callback(true, "设置默认成功");
        });
    });
}

//获取默认地址
exports.getDefaultAddress = function(userid, callback) {

    Sample.find({ accountName: userid }).sort({ 'asDefaultAddress': -1 }).then(function(data) {

        callback(true, data);

    });
}