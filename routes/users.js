var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var AddressrService = require('../Service/User/AddressService');
var Address = require('../models/Address');

var InistitutionService = require('../Service/User/InistitutionService');
var Institution = require('../models/Institution');

var mongo = require('mongodb');


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


//获取机构信息明细，新增，修改
router.get('/getInistitutionDetail', function(req, res, next) {
    var resultData = {};
    inistitution.getInistitutionById(req, function(issucess, data) {
        resultData.data = data;
        return res.json(resultData);
    });
});

/**
 * 新增地址
 */
router.post('/addressDetail', function(req, res, next) {
    var resultData = {};
    var country = req.body.country;
    var province = req.body.province;
    var city = req.body.city;
    var district = req.body.district;
    var detailedAddress = req.body.detailedAddress;
    var ZipCode = req.body.ZipCode;
    var contactPerson = req.body.contactPerson;
    var contactTel = req.body.contactTel;
    var accountName = req.body.accountName;
    var id = req.body.id;

    var data = new Address({
        country: country,
        province: province,
        city: city,
        district: district,
        detailedAddress: detailedAddress,
        ZipCode: ZipCode,
        contactPerson: contactPerson,
        contactTel: contactTel,
        accountName: accountName,
    });

    if (id) { //有id，即为保存修改过的数据

        AddressrService.updateById(id, data, function(flag, msg) {
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
    }
});

/**
 * 删除地址
 */
router.get('/addressDelete', function(req, res, next) {
    var resultData = {};
    var id = req.query.id;

    if (id) { //有id
        AddressrService.deleteById(id, function(flag, msg) {
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

/**
 * 获取单个地址信息
 */
router.get('/getOneAddress', function(req, res, next) {
    var resultData = {};
    var id = req.query.id;

    AddressrService.getById(id, function(flag, obj) {
        if (flag) {
            return res.json(obj);
        }
    });

});

/**
 * 新增机构
 */
router.post('/institutionDetail', function(req, res, next) {
    var resultData = {};
    var country = req.body.country;
    var institutionName = req.body.institutionName;
    var department = req.body.department;
    var secondaryDepartment = req.body.secondaryDepartment;
    var tertiaryDepartment = req.body.tertiaryDepartment;
    var principal = req.body.principal;
    var remarks = req.body.remarks;
    var accountName = req.body.accountName;
    var id = req.body.id;

    var data = new Institution({
        country: country,
        institutionName: institutionName,
        department: department,
        secondaryDepartment: secondaryDepartment,
        tertiaryDepartment: tertiaryDepartment,
        principal: principal,
        remarks: remarks,
        accountName: accountName,
    });


    if (id) { //有id，即为保存修改过的数据

        InistitutionService.updateById(id, data, function(flag, msg) {
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
        if (!principal && !institutionName) {
            resultData.code = 1;
            resultData.message = "请填写完整的机构信息";
            return res.json(resultData);
        } else {
            InistitutionService.save(data, function(flag, msg) {
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
    }
});
/**
 * 获取单个地址信息
 */
router.get('/getOneInistitution', function(req, res, next) {
    var resultData = {};
    var id = req.query.id;

    InistitutionService.getById(id, function(flag, obj) {
        if (flag) {
            return res.json(obj);
        }
    });

});
/**
 * 删除机构
 */
router.get('/inistitutionDelete', function(req, res, next) {
    var resultData = {};
    var id = req.query.id;

    if (id) { //有id
        InistitutionService.deleteById(id, function(flag, msg) {
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




//获得机构列表
router.get('/getInistitutionLists', function(req, res, next) {

    var id = req.session.accountId;
    Institution.find({ accountName: id }).then(function(data) {
        return res.json(data);
    });
});

//获得地址列表
router.get('/getAddressLists', function(req, res, next) {

    var id = req.session.accountId;

    Address.find({ accountName: id }).then(function(data) {

        return res.json(data);
    });

});









module.exports = router;