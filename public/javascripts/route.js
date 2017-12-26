var accesstokenstring = "access_token=" + localStorage.getItem('access_token') + "&accountId=" + localStorage.getItem('accountId');

var app = angular.module('orderSystem', ['ngRoute', 'ngMessages']);

/**
 * 首先要定义应用的访问规则。可以通过在应用中设置常量，然后在每个路由中通过对比这些常量来判断用户是否具有访问权限
 */
// app.constant('ACCESS_LEVELS', {
//     pub: 1,
//     user: 2
//         //admin: 3
// });


/**
 * 系统设置
 */
app.config(['$routeProvider', '$interpolateProvider', function($routeProvider, $interpolateProvider, ACCESS_LEVELS) {

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
            templateUrl: '/users/password?' + accesstokenstring
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


/**
 * 这个拦截器会处理所有请求的响应以及响应错误。
 */
app.config(['$httpProvider', function($httpProvider) {
    var interceptor = function($q, $rootScope, Auth) {
        return {
            //请求头中加入token以便验证身份
            'request': function(config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers['X-Access-Token'] = $window.sessionStorage.token;
                }
                return config || $q.when(config);
            },
            'response': function(resp) {
                if (resp.config.url == '/index/main') {
                    Auth.setToken(resp.data.token);
                }
                return resp;
            },
            'responseError': function(rejection) {
                //错误处理
                switch (rejection.status) {
                    case 401:
                        if (rejection.config.url !== '/index/main') {
                            $rootScope.$broadcast('auth:loginRequired');
                        }
                        break;
                    case 403:
                        $rootScope.$broadcast('auth:forbidden');
                        break;
                    case 404:
                        $rootScope.$broadcast('page:notFound');
                        break;
                    case 500:
                        $rootScope.$broadcast('server:error');
                        break;
                    default:
                        $rootScope.$broadcast('error:error');
                        break;
                }
                return $q.reject(rejection);
            }
        }
    }
}]);