var express = require('express');
var captchapng = require('captchapng');
var SendMail = require('../../utils/SendMail');

//生成图片的验证码
// module.exports.generateCode = function() {
//         var code = parseInt(Math.random() * 9000 + 1000);
//         req.session.checkcode = code;
//         var p = new captchapng(100, 30, code);
//         p.color(0, 0, 0, 0);
//         p.color(80, 80, 80, 255);
//         var img = p.getBase64();
//         var imgbase64 = new Buffer(img, 'base64');
//         res.writeHead(200, {
//             'Content-Type': 'image/png'
//         });
//         res.end(imgbase64);
//     }
// exports.verify = function(req, res, next) {
//     var code = parseInt(Math.random() * 9000 + 1000);
//     req.session.checkcode = code;
//     var p = new captchapng(100, 30, code);
//     p.color(0, 0, 0, 0);
//     p.color(80, 80, 80, 255);
//     var img = p.getBase64();
//     var imgbase64 = new Buffer(img, 'base64');
//     res.writeHead(200, {
//         'Content-Type': 'image/png'
//     });
//     res.end(imgbase64);
// }

//校验验证码
// module.exports.checkCode = function() {
//     return req.session.checkcode == req.body.code;
// }


exports.generateCodeEmail = function(req, callback) {
    var code = parseInt(Math.random() * 9000 + 1000);
    req.session.codeEmail = code;
    req.session.email = req.body.email;
    var result = SendMail(code, req.body.email, function(result) {
        callback(result);
    });
}
exports.CheckCode = function(req) {
    return req.session.codeEmail == req.body.vertifycode;
}