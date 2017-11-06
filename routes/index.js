var express = require('express');
var router = express.Router();


//首页
router.get('/index/main', function(req, res, next) {
    res.render('main', { title: '世和送样信息表系统', layout: null });
});

//页面：服务介绍 
router.get('/serviceInfo', function(req, res, next) {
    res.render('serviceInfo', { title: '世和送样信息表系统', layout: null });
});

//页面：测序服务
router.get('/serviceList', function(req, res, next) {
    res.render('serviceList', { title: '世和送样信息表系统', layout: null });
});


/**
 * 加载layout和ng-view
 */
router.get('/', function(req, res, next) {
    res.render('index', { title: '世和送样信息表系统' });
});
module.exports = router;