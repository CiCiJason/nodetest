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
        if (finddata.length == 0) {
            callBack(false, 10000);
        } else {
            callBack(true, finddata[0].orderId);
        }
    });
}

exports.getById = function(data, callback) {

    OrderDetail.findById({ _id: data }).then(function(result) {
        callback(true, result._doc);
    });

}

//更新更改之后的信息
exports.updateById = function(id, data, callback) {

    OrderDetail.update({ _id: id }, {
        orderId: data.orderId,
        proId: data.proId,
        institution: data.institution,
        address: data.address,
        sequencingPlatform: data.sequencingPlatform,
        readLong: data.readLong,
        type: data.type,
        laneNum: data.laneNum,
        tagSelect: data.tagSelect,
        library2100result: data.library2100result,
        waybillNumber: data.waybillNumber,
        modeOfTransport: data.modeOfTransport,
        otherModeOfTransport: data.otherModeOfTransport,
        carryHardDisk: data.carryHardDisk,
        SNNum: data.SNNum,
        totalNumberOfSamples: data.totalNumberOfSamples,
        totalNumberOfTubes: data.totalNumberOfTubes,
        sampleDescription: data.sampleDescription,
        sampleSpecies: data.sampleSpecies,
        constructionMethod: data.constructionMethod,
        specificSequence: data.specificSequence,
        remarks: data.remarks,
        accountName: data.accountName,
        institutionText: data.institutionText,
        addressText: data.addressText,
        typeText: data.typeText
    }).then(function(data) {
        callback(true);
    }, function(err) {
        callback(false);
    });

}

//获取送样信息列表
exports.getOrderLists = function(isquery, findOption, page, id, callback) {

    var limit = 10;
    var counts = 0;
    var pages = 0;

    if (isquery) {
        OrderDetail.find(findOption).count().then(function(counts) {

            if (counts) {

                //取值限制
                pages = Math.ceil(counts / limit);
                page = Math.max(page, 1);
                page = Math.min(page, pages);

                var skip = (page - 1) * limit;

                OrderDetail.find(findOption).sort({ "createDate": -1 }).limit(limit).skip(skip).then(function(OrderDetail) {
                    callback(true, {
                        OrderDetail: OrderDetail,
                        counts: counts,
                        page: page,
                        pages: pages
                    })
                });
            } else {
                callback(false, {
                    OrderDetail: '',
                    counts: 0,
                    page: 1,
                    pages: 1
                });
            }
        });
    } else {
        OrderDetail.find({ accountName: id }).count().then(function(counts) {

            if (counts) {

                //取值限制
                pages = Math.ceil(counts / limit);
                page = Math.max(page, 1);
                page = Math.min(page, pages);

                var skip = (page - 1) * limit;

                OrderDetail.find({ accountName: id }).sort({ "createDate": -1 }).limit(limit).skip(skip).then(function(OrderDetail) {
                    callback(true, {
                        OrderDetail: OrderDetail,
                        counts: counts,
                        page: page,
                        pages: pages
                    })
                });
            } else {
                callback(false, {
                    OrderDetail: '',
                    counts: 0,
                    page: 1,
                    pages: 1
                });
            }

        });
    }

}

//查找
exports.find = function(id, callback) {

    Sample.find({ orderId: id }).then(function(data) {
        if (data) {
            callback(true, data);
        } else {
            callback(false, "查找失败");
        }
    });
}


//删除
exports.deleteById = function(id, callback) {

    OrderDetail.remove({ _id: id }, function(err, data) {
        if (err) console.log("失败");
    }).then(function(data) {
        callback(true, "删除成功");
    });

}