app.controller('indexCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.login = 1;
    $scope.reg = 1;
    $scope.loginSuccess = 0;
    $scope.regSuccess = 0;




    $scope.change = function() {
        $scope.login = !$scope.login;
        $scope.reg = !$scope.reg;
        $scope.loginSuccess = 0;
        $scope.regSuccess = 0;
    };
    /**
     * 登录
     */
    $scope.user = {
        accountname: '',
        password: '',
        repassword: '',
        email: ''
    };
    $scope.loginSubmit = function() {

        $http({
            method: 'POST',
            url: '/api/login',
            data: { user: $scope.user }
        }).then(function(data) {
            if (!data.data.code) {

                $window.sessionStorage.token = data.data.token;
                $scope.loginSuccess = 1;

                //alert(data.data.message);
            } else {
                alert(data.data.message);
            }


            $scope.message = data.data.message;

        });
    };

    /**
     * 注册
     */
    $scope.regSubmit = function() {

        $http({
            method: 'POST',
            url: '/api/register',
            data: { user: $scope.user }
        }).then(function(data, status, headers, config) {

            $window.sessionStorage.token = data.token;

        }, function(data, status, headers, config) {
            // Erase the token if the user fails to log in
            delete $window.sessionStorage.token;

            // Handle login errors here
            // $scope.message = 'Error: Invalid user or password';
        });
    }


}]);

// function(data, status, headers, config) {
//     // Erase the token if the user fails to log in
//     delete $window.sessionStorage.token;

//     // Handle login errors here
//     // $scope.message = 'Error: Invalid user or password';
// });
// }
// }]);