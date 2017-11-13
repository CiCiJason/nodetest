//var Institution = require("../../models/Institution.js");

//新增地址
exports.save = function(data, callback) {

    data.save().then(function(result) {
        callback(true, "新增成功");
    });

}