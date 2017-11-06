var express = require('express');
var router = express.Router();

/**
 * 页面：送样信息表管理
 */
router.get('/myorders', function(req, res, next) {
    res.render('orders/myorders', { title: '世和送样信息表系统', layout: null });
});

/**
 * 页面：送样信息表明细
 */
router.get('/orderDetail', function(req, res, next) {
    res.render('orders/orderDetail', { title: '世和送样信息表系统', layout: null });
});



module.exports = router;