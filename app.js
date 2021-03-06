var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var apiAuth = require("./utils/Validauth");

var routes = require('./routes/route');

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cookieParser());
app.use(session({
    secret: '123456',
    name: 'testapp', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    //cookie: { maxAge: 1000 * 60 * 60 * 24 }, //设置maxAge是1天，即1天后session和相应的cookie失效过期
    cookie: { maxAge: 1000 * 60 * 60 * 24 },

    resave: false, // 是否每次都重新保存会话，建议false
    saveUninitialized: true, // 是否自动保存未初始化的会话，建议false
    store: new MongoStore({ //创建新的mongodb数据库
        host: '127.0.0.1', //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
        port: 27017, //数据库的端口号
        url: 'mongodb://127.0.0.1:27017/shihe',
        db: 'shihe', //数据库的名称。
        cookieSecret: 'shihe',
        mongodb: 'mongodb://127.0.0.1:27017/shihe',
    })
}));


app.use(express.static(path.join(__dirname, 'public')));


app.all('/*', [apiAuth]);
routes(app);


// var index = require('./routes/index');
// //var users = require('./routes/users');
// var api = require('./api/api');


/**
 * 全部都需要验证用户的权限？？？
 */
//app.all('/*', [apiAuth]);
/**
 * 全部都需要验证用户的权限？？？
 */

// app.use('/', index);
//app.use('/users', users);

// We are going to protect /api routes with JWT 
//JWT：JSON Web Token 
//app.use(expressJwt({ secret: 'secret' }).unless({ path: ['/api/login'] }));
// app.use('/api', api);
//app.use(express.json());
//app.use(express.urlencoded());




//连接数据库

//可以用的时候再连接。。。。。
// mongoose.connect('mongodb://localhost:27020/shihe', function(err) {
//     if (err) {
//         console.log('数据库连接失败')
//     } else {
//         console.log('数据库连接成功');
//     }
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;