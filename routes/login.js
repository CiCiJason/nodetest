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
 * 用户登录
 */
router.post('/', function(req, res, next) {
    var accountname = req.body.user.accountname;
    var password = req.body.user.password;
    var data = new User({
        accountname: accountname,
        password: password
    });
    UserService.SignIn(data);
});

/**
 * 用户注册
 */
router.post('/register', function(req, res, next) {
    var resultData = {};
    var accountname = req.body.user.accountname;
    var password = req.body.user.password;
    var repassword = req.body.user.repassword;
    var email = req.body.user.email;
    var data = new User({
        accountname: accountname,
        password: password,
        repassword: repassword,
        email: email
    });
    console.log(data);
    if (!accountname && !password && !repassword && !email) {
        resultData.code = 1;
        resultData.message = "请填写完整的注册信息";
        return res.json(resultData);
    } else if (password != repassword) {
        resultData.code = 2;
        resultData.message = "用户名和密码不一致";
        return res.json(resultData);
    } else {
        UserService.SignUp(data, function(flag, msg) {
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
        //console.log(1);
    }
});

router.post("/SignUp", function(req, res, next) {
    var resultData = {};
    if (req.session.codeEmail == req.body.Code) {
        userService.SignUp(req.body, function(flage, msg) {
            resultData.isSuccess = flage;
            resultData.msg = msg;
            return res.json(resultData);
        });
    } else {
        resultData.isSuccess = false;
        resultData.msg = "验证码不正确!";
        return res.json(resultData);
    }
});








module.exports = router;