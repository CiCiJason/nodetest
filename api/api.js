var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var fs = require('fs');

var app = express();


var User = require('../models/User');
var Address = require('../models/Address');
var Institution = require('../models/Institution');
var OrderDetail = require('../models/OrderDetail');


/**
 * 用户登录
 */
router.post('/login', function(req, res, next) {

    var accountname = req.body.user.accountname;
    var password = req.body.user.password;
    //console.log("1" + accountname + '1');
    //console.log(password);


    //初始化相应数据,统一返回格式
    var responseData;
    // router.use(function(req, res, next) {
    //     responseData = {
    //         code: 0,
    //         message: ''
    //     };
    //     next();
    // });

    if (accountname == '' || password == '') {
        router.use(function(req, res) {
            responseData = {
                code: 1,
                message: '用户名和密码不能为空'
            };
            res.json(responseData);
        });
        return;
    } else {

        //连接mongodb数据库验证用户
        User.findOne({
            accountname: accountname,
            password: password
        }).then(function(userInfo) {
            console.log(userInfo);
            if (!userInfo) {
                //不存在用户名
                responseData = {
                    code: 2,
                    message: '用户名或密码错误！'
                };
                res.json(responseData);
                return;
            } else {
                //用户名和密码正确
                // responseData = {
                //     // code: 0,
                //     // message: '登录成功！',
                //     id: userInfo._id,
                //     accountname: userInfo.accountname,
                //     // email: userInfo.email,
                //     // tel: userInfo.tel
                // };
                // We are sending the profile inside the token
                //把用户信息生成令牌


                // 创建token
                // var token = jwt.sign(accountname, 'app.get(superSecret)', {
                //     'expiresInMinutes': 1440 // 设置过期时间
                // });

                // sign with default (HMAC SHA256)
                var jwt = require('jsonwebtoken');
                var token = jwt.sign({ user: accountname }, 'liuqincici', { expiresIn: '24h' });
                //backdate a jwt 30 seconds
                //console.log(token);

                // json格式返回token
                res.json({
                    code: 0,
                    message: '登录成功',
                    token: token
                });

                // expressJwt({ secret: 'secret' });
                // var token = jwt.sign({ useraccountname: userInfo.accountname }, secret, { expiresInMinutes: 1000 * 60 * 5 }); //5分钟
                // console.log(token);
                // //var token = jwt.sign(profile, secret, { expiresInMinutes: 60 * 5 }); //5分钟

                // res.json({ token: token });
            }

        });

    }


});



/**
 * 用户注册
 */
router.post('/register', function(req, res, next) {

    var accountname = req.body.user.accountname;
    var password = req.body.user.password;
    var repassword = req.body.user.repassword;
    var email = req.body.user.email;

    //初始化相应数据,统一返回格式
    var responseData;
    router.use(function(req, res, next) {
        responseData = {
            code: 0,
            message: ''
        };
        next();
    });

    //用户名不能为空
    if (accountname == '') {
        responseData = {
            code: 1,
            message: '账户名不能为空'
        };
        res.json(responseData);
        return;
    }

    //密码不能为空
    if (password == '') {
        responseData = {
            code: 2,
            message: '密码不能为空'
        };
        res.json(responseData);
        return;
    }

    //两次密码是否一致
    if (repassword == '' || repassword != password) {
        responseData = {
            code: 3,
            message: '两次密码不一致'
        };
        res.json(responseData);
        return;
    }

    //邮箱不能为空
    if (email == '') {
        responseData = {
            code: 4,
            message: '邮箱不能为空'
        };
        res.json(responseData);
        return;
    }

    //不存在以上情况，验证数据库中是否已有用户名
    User.findOne({
        accountname: accountname
    }).then(function(userInfo) {

        if (userInfo) {
            //已存在用户名
            //console.log(userInfo);
            responseData = {
                code: 5,
                message: '用户名已被注册'
            };
            res.json(responseData);
            return;
        }

        //  可以注册，保存账户名进数据库
        //保存用户信息到数据库
        var usernew = new User({
            accountname: accountname,
            password: password,
            email: email
        });
        //console.log(usernew);

        return usernew.save();


    }).then(function(newuserInfo) {

        //console.log(newuserInfo);
        responseData = {
            code: 0,
            message: ''
        };

        res.json(responseData);
        return;
    });



});

/**
 * 退出登录
 */

router.get('/logout', function(req, res) {
    var responseData = {};
    req.cookies.set('userInfo', null);
    res.json(responseData);
    return;
});


router.get('/admin/index', function(req, res, next) {
    res.render('admin/index', {
        title: '后台系统',
        userInfo: req.userInfo
    });
});



/**
 * 提交新增的机构信息
 */
router.post('/institution', function(req, res, next) {

    var country = req.body.institutionDetail.country;
    var institutionName = req.body.institutionDetail.institutionName;
    var department = req.body.institutionDetail.department;
    var secondaryDepartment = req.body.institutionDetail.secondaryDepartment;
    var tertiaryDepartment = req.body.institutionDetail.tertiaryDepartment;
    var principal = req.body.institutionDetail.principal;
    var remarks = req.body.institutionDetail.remarks;


    //初始化相应数据,统一返回格式
    var responseData;
    // router.use(function(req, res, next) {
    //     responseData = {
    //         code: 0,
    //         message: ''
    //     };
    //     next();
    // });

    if (country == '' || institutionName == '' || principal == '') {
        router.use(function(req, res) {
            responseData = {
                code: 1,
                message: '请填写完成的机构信息'
            };
            res.json(responseData);
        });
        return;
    } else {

        //连接mongodb数据库验证用户
        Institution.findOne({
            country: country,
            institutionName: institutionName,
            department: department,
            secondaryDepartment: secondaryDepartment,
            tertiaryDepartment: tertiaryDepartment,
            principal: principal
        }).then(function(findInfo) {
            console.log(findInfo);
            if (findInfo) {
                //找到相同信息
                responseData = {
                    code: 2,
                    message: '相同的机构信息已存在，请输入新的机构信息'
                };
                res.json(responseData);
                return;
            } else {

                //保存用户信息到数据库
                var institutionDetailNew = new Institution({
                    country: country,
                    institutionName: institutionName,
                    department: department,
                    secondaryDepartment: secondaryDepartment,
                    tertiaryDepartment: tertiaryDepartment,
                    principal: principal,
                    remarks: remarks
                });
                console.log(institutionDetailNew);

                return institutionDetailNew.save();

            }

        }).then(function(newinstitutionDetail) {

            //console.log(newinstitutionDetail);
            responseData = {
                code: 0,
                message: '保存成功'
            };

            res.json(responseData);
            return;
        });

    }


});



/**
 * 提交新增的地址信息
 */
router.post('/address', function(req, res, next) {

    var country = req.body.addressDetail.country;
    var province = req.body.addressDetail.province;
    var city = req.body.addressDetail.city;
    var district = req.body.addressDetail.district;
    var detailedAddress = req.body.addressDetail.detailedAddress;
    var ZipCode = req.body.addressDetail.ZipCode;
    var contactPerson = req.body.addressDetail.contactPerson;
    var contactTel = req.body.addressDetail.contactTel;


    //初始化相应数据,统一返回格式
    var responseData;
    // router.use(function(req, res, next) {
    //     responseData = {
    //         code: 0,
    //         message: ''
    //     };
    //     next();
    // });

    if (province == '' || city == '' || district == '' || detailedAddress == '' || contactPerson == '' || contactTel == '') {
        // router.use(function(req, res) {
        responseData = {
            code: 1,
            message: '请填写完整的地址信息'
        };

        // });
        res.json(responseData);
        return;
    } else {

        //连接mongodb数据库验证用户
        Address.findOne({
            province: province,
            city: city,
            district: district,
            detailedAddress: detailedAddress,
            contactPerson: contactPerson

        }).then(function(findInfo) {
            console.log(findInfo);
            if (findInfo) {
                //找到相同信息
                responseData = {
                    code: 2,
                    message: '相同的地址信息已存在，请输入新的地址信息'
                };
                res.json(responseData);
                return;
            } else {

                //保存用户信息到数据库
                var addressDetailNew = new Address({
                    country: country,
                    province: province,
                    city: city,
                    district: district,
                    detailedAddress: detailedAddress,
                    ZipCode: ZipCode,
                    contactPerson: contactPerson,
                    contactTel: contactTel
                });
                console.log(addressDetailNew);

                return addressDetailNew.save();

            }
        }).then(function(newaddressDetail) {

            //console.log(newinstitutionDetail);
            responseData = {
                code: 0,
                message: '保存成功'
            };

            res.json(responseData);
            return;
        });

    }


});




module.exports = router;