//var Address = require("../../models/Address.js");

//新增地址
exports.save = function(data, callback) {

    data.save().then(function(result) {
        callback(true, "新增成功");
    });

}