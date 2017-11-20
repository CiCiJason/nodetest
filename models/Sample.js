var mongoose = require('../conf/db');

//定义用户的表结构
var Schema = mongoose.Schema;

var SampleSchema = new Schema({

    SampleId: { //样本编号
        type: Number,
        default: 10000
    },

    type: { //	文库类型
        type: String,
        default: ''
    },

    laneNum: { //包lane数量
        type: String,
        default: ''
    },

    fragmentLength: { //文库插入片段长度
        type: Number,
        default: 0
    },

    splitData: { //是否拆分数据
        type: Boolean,
        default: true //true:拆分数据  false:不拆分数据  
    },

    INshihe: {
        type: Boolean,
        default: true //true:在 false:不在
    },

    MolarConcentration: { //	摩尔浓度
        type: Number,
        default: 0
    },

    volume: { //	体积
        type: Number,
        default: 0
    },

    proportion: { //	phix比例
        type: Number,
        default: 0
    },

    createDate: { //创建时间
        type: Date,
        default: Date.now
    },

    accountName: { //账户名
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    orderId: { //送样信息表编号
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderDetail'
    },



    // body: String,
    // comments: [{ body: String, date: Date }],
    // date: { type: Date, default: Date.now },
    // hidden: Boolean,
    // meta: {
    //     votes: Number,
    //     favs: Number
    // }

});



module.exports = mongoose.model('Sample', SampleSchema);