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
    //查找
exports.find = function(id, callback) {

        Sample.find({ orderId: id }).then(function(data) {
            if (data.length) {
                callback(true, data);
            } else {
                callback(false, "查找失败");
            }
        });
    }
    //删除
exports.removeById = function(data, callback) {

    Sample.remove({ _id: data }).then(function(result) {
        if (result.result.n) {
            callback(true, "删除成功");
        } else {
            callback(false, "删除失败");
        }
    });

}

exports.updateById = function(id, data, callback) {

    Sample.update({ _id: id }, {
        SampleId: data.SampleId,
        type: data.type,
        laneNum: data.laneNum,
        fragmentLength: data.fragmentLength,
        splitData: data.splitData,
        INshihe: data.INshihe,
        MolarConcentration: data.MolarConcentration,
        volume: data.volume,
        proportion: data.proportion
    }).then(function(data) {
        callback(true);
    }, function(err) {
        callback(false);
    });

}