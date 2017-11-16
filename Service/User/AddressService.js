var Address = require("../../models/Address.js");

//新增地址
exports.save = function(data, callback) {

        data.save().then(function(result) {
            callback(true, "新增成功");
        });

    }
    //
exports.getById = function(data, callback) {

    Address.findById({ _id: data }).then(function(result) {
        callback(true, result._doc);
    });

}

//编辑更改地址
exports.updateById = function(id, data, callback) {

        Address.update({ _id: id }, {
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

        Address.remove({ _id: id }).then(function(data) {
            callback(true, "删除成功");
        });

    }
    //设置默认地址
exports.updateDefaultAddress = function(userid, addressId, callback) {

    Address.updateMany({ accountName: userid }, { $set: { asDefaultAddress: false } }).then(function(err, data) {
        //console.log(1);
        Address.update({ _id: addressId }, { $set: { asDefaultAddress: true } }).then(function(err, data) {
            callback(true, "设置默认成功");
        });
    });
}

//获取默认地址
exports.getDefaultAddress = function(userid, callback) {

    Address.find({ accountName: userid }, { 'province': 1, 'asDefaultAddress': 1, 'city': 1, 'district': 1, 'detailedAddress': 1 }).sort({ 'asDefaultAddress': -1 }).then(function(data) {

        callback(true, data);

    });
}