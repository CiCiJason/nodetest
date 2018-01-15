var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var AddressService = require('../Service/User/AddressService');
var Address = require('../models/Address');

var InistitutionService = require('../Service/User/InistitutionService');
var Institution = require('../models/Institution');
var User = require('../models/User');


var UserService = require('../Service/User/UserService');

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

        AddressService.updateById(id, data, function(flag, msg) {
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
            AddressService.save(data, function(flag, msg) {
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
    var id = String(req.query.id).slice(4, -4);

    if (id) { //有id
        AddressService.deleteById(id, function(flag, msg) {
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

    AddressService.getById(id, function(flag, obj) {
        if (flag) {
            return res.json(obj);
        }
    });

});
/**
 * 设置默认地址
 */
router.get('/setDefaultAddress', function(req, res, next) {
    var resultData = {};
    var userid = req.session.accountId;
    var addressId = String(req.query.id).slice(2, -2);




    if (addressId) { //有id
        AddressService.updateDefaultAddress(userid, addressId, function(flag, msg) {
            if (flag) {
                resultData.code = 0;
                resultData.message = "设置默认成功";
                return res.json(resultData);
            } else {
                resultData.code = 2;
                resultData.message = "设置默认失败";
                return res.json(resultData);
            }
        });

    }
});
/**
 * 获取默认地址
 */
router.get('/getDefaultAddress', function(req, res, next) {
    var resultData = {};
    var userid = req.session.accountId;

    AddressService.getDefaultAddress(userid, function(flag, data) {
        if (flag) {
            resultData.code = 0;
            return res.json(data);
        } else {
            resultData.code = 2;
            return res.json(data);
        }
    });
});

//获得地址列表
router.get('/getAddressLists', function(req, res, next) {

    var userid = req.session.accountId;

    var limit = 10;
    var counts = 0;
    var pages = 0;
    var page = Number(req.query.page) || 1;

    // Address.find({ accountName: userid }).then(function(data) {

    //     return res.json(data);
    // });

    Address.find({ accountName: userid }).count().then(function(counts) {

        if (counts) {

            //取值限制
            pages = Math.ceil(counts / limit);
            page = Math.max(page, 1);
            page = Math.min(page, pages);

            var skip = (page - 1) * limit;

            Address.find({ accountName: userid }).limit(limit).skip(skip).then(function(address) {
                return res.json({
                    address: address,
                    counts: counts,
                    page: page,
                    pages: pages
                });
            });
        } else {
            return res.json("查询失败");
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
 * 获取单个机构信息
 */
router.get('/getOneInstitution', function(req, res, next) {
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
    var id = String(req.query.id).slice(4, -4);



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

/**
 * 设置默认机构
 */
router.get('/setDefaultInistitution', function(req, res, next) {
    var resultData = {};
    var userid = req.session.accountId;
    var inistitutionId = String(req.query.id).slice(2, -2);




    if (inistitutionId) { //有id
        InistitutionService.updateDefaultInistitution(userid, inistitutionId, function(flag, data) {
            if (flag) {
                resultData.code = 0;
                return res.json(data);
            } else {
                resultData.code = 2;
                return res.json(data);
            }
        });

    }
});

/**
 * 获取默认机构
 */
router.get('/getDefaultInistitution', function(req, res, next) {
    var resultData = {};
    var userid = req.session.accountId;

    InistitutionService.getDefaultInistitution(userid, function(flag, data) {
        if (flag) {
            resultData.code = 0;
            return res.json(data);
        } else {
            resultData.code = 2;
            return res.json(data);
        }
    });
});


//获得机构列表
router.get('/getInistitutionLists', function(req, res, next) {

    var querycountry = req.query.querycountry;
    var queryinstitutionName = req.query.queryinstitutionName;

    var userid = req.session.accountId;

    var limit = 10;
    var counts = 0;
    var pages = 0;
    var page = Number(req.query.page) || 1;

    // Institution.find({ accountName: userid }).then(function(data) {
    //     return res.json(data);
    // });
    if (querycountry || queryinstitutionName) {

        var findOption = {};

        if (querycountry && queryinstitutionName) {
            findOption = { accountName: userid, country: querycountry, institutionName: queryinstitutionName };
        } else if (querycountry && !queryinstitutionName) {
            findOption = { accountName: userid, country: querycountry };
        } else {
            findOption = { accountName: userid, institutionName: queryinstitutionName };
        }

        Institution.find(findOption).count().then(function(counts) {

            if (counts) {
                //取值限制
                pages = Math.ceil(counts / limit);
                page = Math.max(page, 1);
                page = Math.min(page, pages);

                var skip = (page - 1) * limit;

                Institution.find(findOption).limit(limit).skip(skip).then(function(institution) {
                    return res.json({
                        institution: institution,
                        counts: counts,
                        page: page,
                        pages: pages
                    });
                });
            } else {
                return res.json({
                    institution: '',
                    counts: 0,
                    page: 1,
                    pages: 1
                });
            }

        });
    } else {
        Institution.find({ accountName: userid }).count().then(function(counts) {

            if (counts) {

                //取值限制
                pages = Math.ceil(counts / limit);
                page = Math.max(page, 1);
                page = Math.min(page, pages);

                var skip = (page - 1) * limit;

                Institution.find({ accountName: userid }).limit(limit).skip(skip).then(function(institution) {
                    return res.json({
                        institution: institution,
                        counts: counts,
                        page: page,
                        pages: pages
                    });
                });
            } else {
                return res.json("查询失败");
            }

        });
    }

});


//获得用户信息
router.get('/getUserInfo', function(req, res, next) {

    var userid = req.session.accountId;
    UserService.getById(userid, function(flag, data) {
        if (flag) {
            res.json(data);
        }
    });
});


//显示信息时，获取个人信息
router.get('/getUserInfo', function(req, res, next) {

    var userid = req.session.accountId;

    UserService.updateById(userid, data, function(flag, data) {
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

});

//保存用户编辑之后的个人信息
router.post('/saveUserInfo', function(req, res, next) {
    var resultData = {};
    var accountname = req.body.accountname;
    var username = req.body.username;
    var email = req.body.email;
    var tel = req.body.tel;

    var data = new User({
        accountname: accountname,
        username: username,
        email: email,
        tel: tel
    });
    var userid = req.session.accountId;

    UserService.updateById(userid, data, function(flag, data) {
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

});


module.exports = router;