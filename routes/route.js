var index = require('./index');
var users = require('./users');
var login = require('./login');
var orders = require('./orders');
var serviceDetail = require('./serviceDetail');
var api = require('../api/api');


module.exports = function(app) {
    app.use('/', index);
    app.use('/users', users);
    app.use('/login', login);
    app.use('/orders', orders);
    app.use('/serviceDetail', serviceDetail);
    app.use('/api', api);
}