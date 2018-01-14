var accesstokenstring = "access_token=" + localStorage.getItem('access_token') + "&accountId=" + localStorage.getItem('accountId');

var app = angular.module('orderSystem', ['ngRoute', 'ngMessages', 'cici.pagination', 'angular-simditor']);


/**
 * 系统设置
 */
app.config(['$routeProvider', '$interpolateProvider', function($routeProvider, $interpolateProvider) {

    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

    /**
     * 路由设置
     */
    $routeProvider
        .when('/index/main', {
            templateUrl: '/index/main?' + accesstokenstring,
            controller: 'indexCtrl'
        }) //首页
        .when('/serviceInfo', {
            templateUrl: '/serviceInfo?' + accesstokenstring
        }) //服务介绍
        .when('/serviceList', {
            templateUrl: '/serviceList?' + accesstokenstring
        }) //测序服务
        .when('/users/baseInfo', {
            controller: 'baseInfoCtrl',
            templateUrl: '/users/baseInfo?' + accesstokenstring
        }) //基本信息设置
        .when('/users/institution', {
            templateUrl: '/users/institution?' + accesstokenstring,
            controller: 'institutionCtrl'
        }) //机构管理
        .when('/users/address', {
            templateUrl: '/users/address?' + accesstokenstring,
            controller: 'addressCtrl'
        }) //地址管理
        .when('/orders/myorders', {
            templateUrl: 'orders/myorders?' + accesstokenstring,
            controller: 'baseInfoCtrl'
        }) //送样信息表管理
        .when('/users/password', {
            templateUrl: '/users/password?' + accesstokenstring,
            controller: 'changePwdCtrl'
        }) //密码管理
        .when('/orders/orderDetail', {
            templateUrl: '/orders/orderDetail?' + accesstokenstring,
            controller: 'orderDetailCtrl'
        }) //送样信息表明细
        .when('/users/addressDetail', {
            templateUrl: '/users/addressDetail?' + accesstokenstring,
            controller: 'addressDetailCtrl'
        }) //地址管理明细
        .when('/users/institutionDetail', {
            templateUrl: '/users/institutionDetail?' + accesstokenstring,
            controller: 'institutionDetailCtrl'
        }) //机构管理明细
        .when('/login', {
            templateUrl: '/login',
            controller: 'indexCtrl'
        }) //机构管理明细

    .otherwise({ redirectTo: '/index/main' });

}]);