var mongoose = require('../conf/db');

//定义用户的表结构
var Schema = mongoose.Schema;

var InstitutionSchema = new Schema({

    country: { //国家
        type: String,
        default: '中国'
    },

    institutionName: { //机构（学校/公司/医院）名称
        type: String,
        default: ''
    },

    department: { //院系/部门/科室
        type: String,
        default: ''
    },

    secondaryDepartment: { //实验室/二级部门/二级科室
        type: String,
        default: ''
    },

    tertiaryDepartment: { //二级实验室/三级部门/三级科室
        type: String,
        default: ''
    },

    principal: { //负责人
        type: String,
        default: ''
    },

    remarks: { //备注
        type: String,
        default: ''
    },

    asDefaultInstitution: {
        type: Boolean,
        default: false //设置默认机构，正常不是默认机构
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



module.exports = mongoose.model('Institution', InstitutionSchema);