var express = require('express');
var router = express.Router();
var AddressrService = require('../Service/User/AddressService');




//页面：基本信息设置
router.get('/baseInfo', function(req, res, next) {
    res.render('users/baseInfo', { title: '世和送样信息表系统', layout: null });
});

//页面：机构管理
router.get('/institution', function(req, res, next) {
    res.render('users/institution', { title: '世和送样信息表系统', layout: null });
});

// 页面：地址管理
router.get('/address', function(req, res, next) {
    res.render('users/address', { title: '世和送样信息表系统', layout: null });
});

//页面：修改密码
router.get('/password', function(req, res, next) {
    res.render('users/password', { title: '世和送样信息表系统', layout: null });
});

// 页面：机构管理明细
router.get('/institutionDetail', function(req, res, next) {
    res.render('users/institutionDetail', { title: '世和送样信息表系统', layout: null });
});

// 页面：地址管理明细
router.get('/addressDetail', function(req, res, next) {
    res.render('users/addressDetail', { title: '世和送样信息表系统', layout: null });
});


/**
 * 新增地址
 */
router.post('/addressDetail', function(req, res, next) {
    var resultData = {};
    var accountnprovinceame = req.body.province;
    var city = req.body.city;
    var district = req.body.district;
    var detailedAddress = req.body.detailedAddress;
    var ZipCode = req.body.ZipCode;
    var contactPerson = req.body.contactPerson;
    var contactTel = req.body.contactTel;
    var accountName = req.body.accountname;

    var data = new Address({
        country: country,
        province: province,
        district: district,
        detailedAddress: detailedAddress,
        ZipCode: ZipCode,
        contactPerson: contactPerson,
        contactTel: contactTel,
        //accountName: accountName,
    });

    //console.log(data);
    if (!detailedAddress && !contactPerson && !contactTel) {
        resultData.code = 1;
        resultData.message = "请填写完整的地址信息";
        return res.json(resultData);
    } else {
        AddressrService.save(data, function(flag, msg) {
            if (flag) {
                resultData.code = 0;
                resultData.message = "新增成功";
                return res.json(resultData);
            } else {
                resultData.code = 2;
                resultData.message = "新增失败";
                return res.json(resultData);
            }
        });
    }
});

module.exports = router;