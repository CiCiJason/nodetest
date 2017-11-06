var express = require('express');
var router = express.Router();



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


module.exports = router;