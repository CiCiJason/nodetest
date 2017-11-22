var mongoose = require('../conf/db');

//定义用户的表结构
var Schema = mongoose.Schema;

var OrderDetailSchema = new Schema({

    orderId: { //送样信息表编号
        type: Number,
        default: 10000
    },

    proId: { //项目编号
        type: String,
        default: ''
    },

    institution: { //机构
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institution'
    },
    institutionText: { //机构
        type: String,
        default: ''
    },
    address: { //收货地址
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    addressText: { //收货地址
        type: String,
        default: ''
    },
    sequencingPlatform: String, //测序平台

    readLong: String, //读长

    type: String, //送样信息表类型

    laneNum: { //包lane数目
        type: Number,
        default: 0
    },
    tagSelect: { //标签选择
        type: Number,
        default: 1 //1:单端标签  2:双端标签  
    },

    library2100result: String, //文库2100结果

    waybillNumber: { //运单号
        type: Number,
        default: 0
    },

    modeOfTransport: { //运输方式
        type: Number,
        default: ''
    },

    otherModeOfTransport: { //其他运输方式
        type: String,
        default: ''
    },

    carryHardDisk: { //是否携带硬盘
        type: Number,
        default: 1 //1 携带硬盘 2
    },

    SNNum: { //是否携带硬盘
        type: String,
        default: 0
    },

    totalNumberOfSamples: { //样本总数
        type: Number,
        default: 1
    },

    totalNumberOfTubes: { //样本总管数
        type: Number,
        default: 1
    },

    sampleDescription: { //样本说明
        type: String,
        default: ''
    },

    sampleSpecies: { //样本物种
        type: String,
        default: ''
    },

    constructionMethod: { //建库方法
        type: String,
        default: ''
    },

    specificSequence: { //特定序列
        type: String,
        default: ''
    },

    remarks: { //备注
        type: String,
        default: ''
    },

    createDate: { //创建时间
        type: Date,
        default: Date.now
    },

    accountName: { //账户名
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



module.exports = mongoose.model('OrderDetail', OrderDetailSchema);