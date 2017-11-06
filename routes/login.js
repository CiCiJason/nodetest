var express = require('express');
var router = express.Router();
var CodeService = require('../Service/Code/CodeService');
var User = require('../Service/User/UserService');
var jwthelper = require('../utils/jwthelper');

//跳转登录和注册
router.get('/', function(req, res, next) {
    res.render('login', { title: '世和送样信息表系统', layout: null });
});











module.exports = router;