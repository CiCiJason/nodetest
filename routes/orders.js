var express = require('express');
var router = express.Router();
var OrderService = require('../Service/User/OrderService');
var SampleService = require('../Service/User/SampleService');
var AddressService = require('../Service/User/AddressService');
var InistitutionService = require('../Service/User/InistitutionService');

/**
 * 页面：送样信息表管理
 */
router.get('/myorders', function(req, res, next) {
    res.render('orders/myorders', { title: '世和送样信息表系统', layout: null });
});

/**
 * 页面：送样信息表明细
 */
router.get('/orderDetail', function(req, res, next) {
    res.render('orders/orderDetail', { title: '世和送样信息表系统', layout: null });
});
//送样信息表默认的编号
router.get('/getDefaultOrderId', function(req, res, next) {
    var resultData = {};

    OrderService.getorderId(function(flag, data) {
        if (flag) {
            data++;
            return res.json(data);
        } else {
            resultData.code = 2;
            resultData.message = "删除失败";
            return res.json(resultData);
        }
    });
});
//用户首页显示的送样信息表列表
router.get('/getOrderInfo', function(req, res, next) {

    var userid = req.session.accountId;

    OrderService.getOrderLists(userid, function(flag, data) {
        if (flag) {
            return res.json(data);

            if (data && data.length > 0) {
                data.map(function(item) {
                    AddressService.getById(item.address, function(flag, addressresult) {
                        if (flag) {
                            return res.json(addressresult);
                        }
                    });
                    InistitutionService.getById(item.institution, function(flag, institutionresult) {
                        if (flag) {
                            return res.json(institutionresult);
                        }
                    });
                });
            }

        } else {
            resultData.code = 2;
            resultData.message = "删除失败";
            return res.json(resultData);
        }
    });
});
//获得地址列表
router.get('/getAddressLists', function(req, res, next) {

    var userid = req.session.accountId;

    Address.find({ accountName: userid }).then(function(data) {

        return res.json(data);
    });

});

/**
 * 保存新增送样信息表
 */
router.post('/orderDetail', function(req, res, next) {
    var resultData = {};

    // var accountName = req.session.accountId; //创建用户

    var samples = req.body.samples;

    var data = new OrderService.OrderDetailModel({
        orderId: req.body.orderId,
        proId: req.body.proId,
        institution: req.body.institution,
        address: req.body.address,
        sequencingPlatform: req.body.sequencingPlatform,
        readLong: req.body.readLong,
        type: req.body.type,
        laneNum: req.body.laneNum,
        tagSelect: req.body.tagSelect,
        library2100result: req.body.library2100result,
        waybillNumber: req.body.waybillNumber,
        modeOfTransport: req.body.modeOfTransport,
        otherModeOfTransport: req.body.otherModeOfTransport,
        carryHardDisk: req.body.carryHardDisk,
        SNNum: req.body.SNNum,
        totalNumberOfSamples: req.body.totalNumberOfSamples,
        totalNumberOfTubes: req.body.totalNumberOfTubes,
        sampleDescription: req.body.sampleDescription,
        sampleSpecies: req.body.sampleSpecies,
        constructionMethod: req.body.constructionMethod,
        specificSequence: req.body.specificSequence,
        remarks: req.body.remarks,
        accountName: req.session.accountId,
        institutionText: req.body.institutionText,
        addressText: req.body.addressText
    });

    // if (id) { //有id，即为保存修改过的数据

    //     OrderService.updateById(id, data, function(flag, msg) {
    //         if (flag) {
    //             resultData.code = 0;
    //             resultData.message = "修改成功";
    //             return res.json(resultData);
    //         } else {
    //             resultData.code = 2;
    //             resultData.message = "修改失败";
    //             return res.json(resultData);
    //         }
    //     });

    // } else {

    OrderService.save(data, function(flag, result) {
        if (flag) {

            samples.map(function(item) {
                var sampleData = new SampleService.SampleModel({
                    SampleId: item.SampleId,
                    type: item.type,
                    laneNum: item.laneNum,
                    fragmentLength: item.fragmentLength,
                    splitData: item.splitData,
                    INshihe: item.INshihe,
                    MolarConcentration: item.MolarConcentration,
                    volume: item.volume,
                    proportion: item.proportion,
                    accountName: req.session.accountId,
                    orderId: result
                });
                SampleService.save(sampleData, function(flag, msg) {
                    if (flag) {
                        //resultData.code = 0;
                        console.log("新增sample成功");
                        //return res.json(resultData);
                    } else {
                        //resultData.code = 2;
                        //resultData.message = "新增失败";
                        console.log("新增sample失败");
                        //return res.json(resultData);
                    }
                })
            });



        } else {
            resultData.code = 2;
            resultData.message = "新增失败";
            //return res.json(resultData);
        }
    });
});



module.exports = router;