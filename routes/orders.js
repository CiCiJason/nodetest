var express = require('express');
var router = express.Router();
var OrderService = require('../Service/User/OrderService');
var SampleService = require('../Service/User/SampleService');

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

router.get('/getorderId', function(req, res, next) {
    //var resultData = {};
    //var id = String(req.query.id).slice(4, -4);

    if (id) { //有id
        OrderService.getorderId(function(flag, data) {
            if (flag) {
                resultData.code = 0;
                return res.json(data);
            } else {
                resultData.code = 2;
                resultData.message = "删除失败";
                return res.json(resultData);
            }
        });

    }
});
/**
 * 保存新增送样信息表
 */
router.post('/orderDetail', function(req, res, next) {
    var resultData = {};
    // var orderId = req.body.orderId;
    // var proId = req.body.proId;
    // var institution = req.body.institution;
    // var address = req.body.address;
    // var sequencingPlatform = req.body.sequencingPlatform;
    // var readLong = req.body.readLong;
    // var type = req.body.type;
    // var laneNum = req.body.laneNum;
    // var tagSelect = req.body.tagSelect;
    // var library2100result = req.body.library2100result;
    // var waybillNumber = req.body.waybillNumber;
    // var modeOfTransport = req.body.modeOfTransport;
    // var otherModeOfTransport = req.body.otherModeOfTransport;
    // var carryHardDisk = req.body.carryHardDisk;
    // var SNNum = req.body.SNNum;
    // var totalNumberOfSamples = req.body.totalNumberOfSamples;
    // var totalNumberOfTubes = req.body.totalNumberOfTubes;
    // var sampleDescription = req.body.sampleDescription;
    // var sampleSpecies = req.body.sampleSpecies;
    // var constructionMethod = req.body.constructionMethod;
    // var specificSequence = req.body.specificSequence;
    // var remarks = req.body.remarks;

    // var accountName = req.session.accountId; //创建用户

    var samples = req.body.samples;
    console.log(samples);


    var id = req.body.id; //送样信息表的ID

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
        accountName: req.session.accountId
    });

    //console.log(data);

    if (id) { //有id，即为保存修改过的数据

        OrderService.updateById(id, data, function(flag, msg) {
            if (flag) {
                resultData.code = 0;
                resultData.message = "修改成功";
                return res.json(resultData);
            } else {
                resultData.code = 2;
                resultData.message = "修改失败";
                return res.json(resultData);
            }
        });

    } else {
        //console.log(data);
        //保存新增的数据
        // if (false||!detailedAddress && !contactPerson && !contactTel) {
        //     resultData.code = 1;
        //     resultData.message = "请填写完整的地址信息";
        //     return res.json(resultData);
        // } else {
        console.log(1);
        console.log(data);
        // OrderService.save(data, function(flag, msg) {
        //     if (flag) {
        //         resultData.code = 0;
        //         console.log("新增order成功");
        //         //return res.json(resultData);
        //     } else {
        //         resultData.code = 2;
        //         resultData.message = "新增失败";
        //         //return res.json(resultData);
        //     }
        // });

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
                orderId: req.body.orderId
            });
            console.log(sampleData);
            SampleService.save(sampleData);
            //         sampleData, function(flag, msg) {
            //         if (flag) {
            //             resultData.code = 0;
            //             console.log("新增sample成功");
            //             //return res.json(resultData);
            //         } else {
            //             resultData.code = 2;
            //             resultData.message = "新增失败";
            //             //return res.json(resultData);
            //         }
            //     })
            // }
        });
    };
});

module.exports = router;