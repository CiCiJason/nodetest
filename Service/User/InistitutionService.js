var Institution = require("../../models/Institution.js");

//新增地址
exports.save = function(data, callback) {

        data.save().then(function(result) {
            callback(true, "新增成功");
        });

    }
    //
exports.getById = function(data, callback) {

        Institution.findById({ _id: data }).then(function(result) {
            callback(true, result._doc);
        });

    }
    //编辑更改机构
exports.updateById = function(id, data, callback) {

        Institution.update({ _id: id }, {
            country: data.country,
            institutionName: data.institutionName,
            department: data.department,
            secondaryDepartment: data.secondaryDepartment,
            tertiaryDepartment: data.tertiaryDepartment,
            principal: data.principal,
            remarks: data.remarks,
            accountName: data.accountName
        }).then(function(data) {
            callback(true, "修改成功");
        });

    }
    //删除机构
exports.deleteById = function(id, callback) {

    Institution.remove({ _id: id }).then(function(data) {
        callback(true, "删除成功");
    });

}