var mongoose = require('../conf/db');
var bcrypt = require('bcrypt');


//定义用户的表结构
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    //账号名
    accountname: String,
    //用户名
    username: String,
    //密码
    password: String,
    //是否是管理员
    isAdmin: {
        type: Boolean,
        default: false
    },
    isUser: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        default: ''
    },
    tel: {
        type: String,
        default: ''
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        default: ''
    }

    // body: String,
    // comments: [{ body: String, date: Date }],
    // date: { type: Date, default: Date.now },
    // hidden: Boolean,
    // meta: {
    //     votes: Number,
    //     favs: Number
    // }

});

module.exports = mongoose.model('User', UserSchema);



//给用户密码加盐加密
// User.prototype.hashPassword = function(fn) {
//     var user = this;
//     // bcrypt.genSalt(12, function(err, salt) {
//     //     if (err) {
//     //         return fn(err);
//     //     }
//     //     user.salt = salt;
//     //     bcrypt.hash(user.password, salt, function(err, hash) {
//     //         if (err) {
//     //             return fn(err);
//     //         }
//     //         user.password = hash;
//     //         return fn();
//     //     });
//     // });

//     bcrypt.hash(user.password, 12, function(err, hash) {
//         user.save();
//     });

// };