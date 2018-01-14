var express = require('express');
var router = express.Router();
var CodeService = require('../Service/Code/CodeService');
var UserService = require('../Service/User/UserService');
var jwthelper = require('../utils/jwthelper');
var User = require('../models/User');

//跳转登录和注册
router.get('/', function(req, res, next) {
    res.render('login', { title: '世和送样信息表系统', layout: null });
});


/**
 * 用户注册
 */
router.post('/register', function(req, res, next) {
    var resultData = {};
    var accountname = req.body.accountname;
    var password = req.body.password;
    var repassword = req.body.repassword;
    var email = req.body.email;
    var vertifycode = req.body.vertifycode;

    var ensure = req.body.ensure;


    var resultCheckCode = CodeService.CheckCode(req);


    if (ensure) {
        var data = {
            accountname: accountname,
            email: email
        };
        UserService.SignUp(data, ensure, function(flag, msg) {
            if (flag) {
                resultData.code = 0;
                resultData.message = "可以注册";
                return res.json(resultData);
            } else {
                resultData.code = 1;
                resultData.message = msg;
                return res.json(resultData);
            }
        });
    } else {
        var data = {
            accountname: accountname,
            password: password,
            repassword: repassword,
            email: email,
            vertifycode: vertifycode
        };
        CodeService.generateCodeEmail
        if (!accountname && !password && !repassword && !email && !vertifycode) {
            resultData.code = 1;
            resultData.message = "请填写完整的注册信息";
            return res.json(resultData);
        } else if (password != repassword) {
            resultData.code = 2;
            resultData.message = "两次输入密码不一致";
            return res.json(resultData);
        } else if (!resultCheckCode) { /////////////////验证码
            resultData.code = 3;
            resultData.message = "您输入的邮箱验证码不正确";
            return res.json(resultData);
        } else {
            UserService.SignUp(data, 'register', function(flag, msg) {
                if (flag) {
                    resultData.code = 0;
                    resultData.message = "注册成功";
                    return res.json(resultData);
                } else {
                    resultData.code = 3;
                    resultData.message = "用户名或者邮箱已经被注册";
                    return res.json(resultData);
                }
            });
        }
    }
});

/**
 * 用户登录
 */
router.post("/", function(req, res, next) {
    var resultData = {};
    var accountname = req.body.accountname;
    var password = req.body.password;
    var data = new User({
        accountname: accountname,
        password: password
    });
    if (accountname && password) {
        UserService.SignIn(req.body, function(flag, msg, userId) {

            if (flag) {
                req.session.accountname = req.body.accountname;
                req.session.accountId = userId;

                resultData.code = 0;
                resultData.message = msg;
                //resultData.backurl = req.baseUrl;
                resultData.accountname = req.body.accountname;
                resultData.userId = userId;

                return res.json(Object.assign({}, jwthelper.genToken(userId), resultData));
                //return res.json(resultData);
            } else {
                resultData.code = 2;
                resultData.message = msg;
                return res.json(resultData);
            }
        });
    } else {
        resultData.code = 1;
        resultData.message = "请填写完整的登录信息";
        return res.json(resultData);
    }

});


/**
 * 修改密码
 */
router.post("/changePwd", function(req, res, next) {
    var resultData = {};
    var accountname = req.body.accountname;
    //var accountId = req.body.accountId;
    var oldpassword = req.body.oldpassword;
    var newpassword = req.body.newpassword;
    var renewpassword = req.body.renewpassword;


    //var password = req.body.password;
    var data = new User({
        accountname: accountname,
        password: oldpassword
    });

    if (newpassword == renewpassword) {

        UserService.SignIn(req.body, function(flag, msg, userId) {

            if (flag) {

                UserService.update(accountname, newpassword, function(flag, msg) {
                    if (flag) {
                        resultData.code = 0;
                        resultData.message = "密码修改成功！";
                        return res.json(resultData);
                    } else {
                        resultData.code = 3;
                        resultData.message = "密码修改失败！";
                        return res.json(resultData);
                    }
                })
            } else {
                resultData.code = 2;
                resultData.message = "原密码输入不正确，请重新输入！";
                return res.json(resultData);
            }
        });

    } else {
        resultData.code = 1;
        resultData.message = "新密码前后两次不一致，请重新输入！";
        return res.json(resultData);
    }



});

/**
 * 获取邮箱验证码
 */
router.post("/getVertifycode", function(req, res, next) {
    var resultData = {};

    CodeService.generateCodeEmail(req, function(flag) {
        if (flag) {
            resultData.code = 0;
            return res.json(resultData);
        } else {
            resultData.code = 1;
            return res.json(resultData);
        }
    });

});


module.exports = router;