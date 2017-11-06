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
        return { code: 1, message: "请填写完整的注册信息" }
    } else if (password != repassword) {
        return { code: 2, message: "用户名和密码不一致" };
    } else {
        UserService.SignUp(data);
    }
});








module.exports = router;