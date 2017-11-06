var jwt = require('jwt-simple');
var config = require('../conf/config');
var secret = config.mx_secret;

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

// HS256 secrets are typically 128-bit random strings, for example hex-encoded: 
// var secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex) 

// encode 
//var token = jwt.encode(payload, secret);

// decode 
//var decoded = jwt.decode(token, secret);
//console.log(decoded); //=> { foo: 'bar' }


exports.genToken = function(user) {
        var expires = expiresIn(1); //1天后token过期
        var token = jwt.encode({
            exp: expires
        }, secret);

        return {
            access_token: token,
            data: user,
            expires: expires
        };
    }
    /**
     * 这个token跟每个用户之间是什么关系？？？
     * token里面只编码了到期时间
     */

/**
 * 懂了，票和任何人没有任何关系，
 * 票只要在有效时间前使用就可以了
 */