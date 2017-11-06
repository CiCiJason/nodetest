/**
 * @Author: snail
 * @Date:   2016-11-14 22:00:00
 * @Last Modified by:
 * @Last Modified time:
 * @Function:接口鉴权
 */

var jwt = require('jwt-simple'); //加密工具
var config = require('../conf/config');
var logger = require('./loghelper').helper;

module.exports = function(req, res, next) {
    if (req.url === '/' || req.url.indexOf('/api') > -1 || req.url.indexOf('/Login') > -1 || req.url.indexOf('/serviceDetail') > -1 || req.url.indexOf('/js/') > -1 || req.url.indexOf('/css/') > -1 || req.url.indexOf('/img/') > -1 || req.url.indexOf('/fonts/') > -1 || req.url.indexOf('/index') > -1 || req.url === '/index/main' || req.url.indexOf('/files') > -1) {
        next();
    } else {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
        var key = (req.body && req.body.mxkey) || (req.query && req.query.mxkey) || req.headers['mxkey'];
        var index = req.url.indexOf("?")
        var url = index > 0 ? req.url.substring(0, index) : req.url;
        if (token || key) {
            try {
                if (token == undefined || token.split('.').length !== 3) {

                    var error = {
                        "status": 400,
                        "message": "未登录!",
                        "backurl": url
                    };
                    res.render("error", error);
                    return;
                }

                var decoded = jwt.decode(token, config.mx_secret);
                if (decoded.exp <= Date.now()) {
                    var error = {
                        "status": 400,
                        "message": "登录过期!",
                        "backurl": url
                    };
                    res.render("error", error);
                    return;
                } else {
                    next();
                }
            } catch (err) {
                var error = {
                    "status": 500,
                    "message": "应用程序错误!",
                    "backurl": url

                };
                res.render("error", error);
                return;
            }
        } else {

            var error = {
                "status": 401,
                "message": "未登录，提供鉴权Token!",
                "backurl": url

            };
            res.render("error", error);
            return;
        }
    }
};