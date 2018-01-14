var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'qq',
    //port: 465, // SMTP 端口
    //secureConnection: true, // 使用 SSL// true for 465, false for other ports
    auth: {
        user: '501981226@qq.com', //
        pass: 'msvqruccnxbibhcb' //授权码,通过QQ获取  
    }
});

// module.exports = function(toEmail, code, callback) {

//     var mailOptions = {
//         from: '501981226@qq.com', // 发送者  
//         to: toEmail, // 接受者,可以同时发送多个,以逗号隔开  
//         subject: 'nodemailer2.5.0邮件发送', // 标题  
//         text: '验证码', // 发送的验证码  
//         html: `<h3>您好，你收到的验证码` + code + '</h3>'
//     };

//     var sendMail = transporter.sendMail(mailOptions, function(err, info) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(info);
//         console.log('发送成功');
//     });

// }
module.exports = function(code, toEmail, callback) {

    var mailOptions = {
        from: '501981226@qq.com', // 发送者  
        to: toEmail, // 接受者,可以同时发送多个,以逗号隔开  
        subject: '仿世和基因订单系统-注册邮件发送', // 标题  
        text: '验证码', // 发送的验证码  
        html: `<h3>您好，你收到的验证码` + code + '</h3>'
    };

    var sendMail = transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
            callback(false);
            return;
        }
        console.log(info);
        console.log('发送成功');
        callback(true);
    });

}