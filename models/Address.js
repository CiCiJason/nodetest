var mongoose = require('../conf/db');

//定义用户的表结构
var Schema = mongoose.Schema;

var AddressSchema = new Schema({

    country: { //国家
        type: String,
        default: '中国'
    },

    province: { //省
        type: String,
        default: ''
    },

    city: { //市
        type: String,
        default: ''
    },

    district: { //区、县
        type: String,
        default: ''
    },

    detailedAddress: { //详细地址
        type: String,
        default: ''
    },

    ZipCode: { //邮编
        type: Number,
        default: 000000
    },

    contactPerson: String, //联系人


    contactTel: Number, //联系电话

    asDefaultAddress: {
        type: Boolean,
        default: false //设置默认地址，正常不是默认地址
    },

    createDate: {
        type: Date,
        default: Date.now
    },

    accountName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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



module.exports = mongoose.model('Address', AddressSchema);