app.factory('angularFileUpload', function($http) {
    var githubUrl = 'https://api.github.com';
    var runUserRequest = function(username, path) {
        // 从使用JSONP调用Github API的$http服务中返回promise
        return $http({
            method: 'JSONP',
            url: githubUrl + '/users/' +
                username + '/' +
                path + '?callback=JSON_CALLBACK'
        });
    };
    // 返回带有一个events函数的服务对象
    return {
        events: function(username) {
            return runUserRequest(username, 'events');
        }
    };
});