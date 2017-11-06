var express = require('express');
var router = express.Router();

/*
 *页面：高通量包lane测序服务
 */
router.get('/baolane', function(req, res, next) {
    res.render('serviceDetail/baolane', { title: '世和送样信息表系统', layout: null });
});

module.exports = router;