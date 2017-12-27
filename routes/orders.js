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

    var id = req.body.id;

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
        addressText: req.body.addressText,
        typeText: req.body.typeText
    });

    if (id) { //有id，即为保存修改过的数据

        OrderService.updateById(id, data, function(flag) {
            if (flag) {
                // 更新完orderDetail之后，查看每条sample，有_id的，则更新，没有_id的，则save

                //var id1 = String(req.query.id).slice(2, -2);

                if (samples.length) {
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
                            orderId: id
                        });

                        if (item._id) {
                            SampleService.updateById(item._id, sampleData, function(flag) {
                                if (flag) {
                                    resultData.code = 0;
                                    return res.json(resultData);
                                }
                            });
                        } else {

                            SampleService.save(sampleData, function(flag, msg) {
                                if (flag) {
                                    resultData.code = 0;
                                    //console.log("新增sample成功");
                                    return res.json(resultData);
                                } else {
                                    resultData.code = 2;
                                    resultData.message = "新增失败";
                                    //console.log("新增sample失败");
                                    return res.json(resultData);
                                }
                            })
                        }
                    });
                } else {
                    resultData.code = 0;
                    //console.log("新增sample成功");
                    return res.json(resultData);
                }


            } else {
                resultData.code = 2;
                resultData.message = "修改失败";
                return res.json(resultData);
            }
        });

    } else {

        OrderService.save(data, function(flag, result) {
            if (flag) {
                if (samples.length) {
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
                                resultData.code = 0;
                                //console.log("新增sample成功");
                                return res.json(resultData);
                            } else {
                                resultData.code = 2;
                                resultData.message = "新增失败";
                                //console.log("新增sample失败");
                                return res.json(resultData);
                            }
                        })
                    });
                } else {
                    resultData.code = 0;
                    //console.log("新增sample成功");
                    return res.json(resultData);
                }

            } else {
                resultData.code = 2;
                resultData.message = "新增失败";
                return res.json(resultData);
            }
        });

    }

});

/**
 * 获取单个送样信息表--编辑查看
 */
router.get('/getOneOrder', function(req, res, next) {
    var resultData = {};
    var id = req.query.id;

    OrderService.getById(id, function(flag, obj) {
        if (flag) {
            //return res.json(obj);
            SampleService.find(obj._id, function(flag, data) {
                if (flag) {
                    obj.samples = data;
                    return res.json(obj);
                } else {
                    return res.json(obj);
                }
            });
        } else {
            console.log("查找单条送样信息表错误");
        }
    });
});

/**
 * 删除单个样本
 */
router.get('/deleteSample', function(req, res, next) {
    var resultDate = {};
    var id = req.query.id;

    SampleService.removeById(id, function(flag, obj) {
        if (flag) {
            resultDate.code = 0;
            return res.json(resultDate);
        } else {
            resultDate.code = 1;
            return res.json(resultDate);
        }
    });
});



/**
 * 删除用户的订单信息
 */
router.get('/orderDelete', function(req, res, next) {
    var resultData = {};
    var id = String(req.query.id).slice(4, -4);



    if (id) { //有id
        OrderService.deleteById(id, function(flag, msg) {
            if (flag) {
                resultData.code = 0;
                resultData.message = "删除成功";
                return res.json(resultData);
            } else {
                resultData.code = 2;
                resultData.message = "删除失败";
                return res.json(resultData);
            }
        });

    }
});


module.exports = router;