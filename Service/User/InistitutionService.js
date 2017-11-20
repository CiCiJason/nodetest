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
        }, function(err, data) {
            callback(false, "失败");
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
            },
            function(err, data) {
                callback(false, "修改失败");
            });

    }
    //删除机构
exports.deleteById = function(id, callback) {

        Institution.remove({ _id: id }, function(err, data) {
            if (err) console.log("失败");
        }).then(function(data) {
            callback(true, "删除成功");
        });

    }
    //设置默认机构
exports.updateDefaultInistitution = function(userid, inistitutionId, callback) {

    Institution.updateMany({ accountName: userid }, { $set: { asDefaultInstitution: false } }).then(function(err, data) {
        //console.log(1);
        Institution.update({ _id: inistitutionId }, { $set: { asDefaultInstitution: true } }).then(function(err, data) {
            callback(true, "设置默认成功");
        });
    });
}

//获取默认机构
exports.getDefaultInistitution = function(userid, callback) {

    Institution.find({ accountName: userid }).sort({ 'asDefaultInstitution': -1 }).then(function(data) {

        callback(true, data);

    });
}