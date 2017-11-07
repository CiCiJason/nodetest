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
            url: '/login',
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
            url: '/login/register',
            data: { user: $scope.user }
        }).then(function(data) {
            console.log(data);
            if (data.data.code == 0) {
                console.log(data.data.message);
                $scope.message = data.data.message;
                $('#myModal').modal({
                    show: true
                });
            } else {
                $scope.message = data.data.message;
                $('#myModal').modal("show");
                console.log(data.data.message);
            }


        }, function(data) {
            // Erase the token if the user fails to log in
            delete $window.sessionStorage.token;

            // Handle login errors here
            // $scope.message = 'Error: Invalid user or password';
        });
    }

    $scope.closeModal = function() {
        setTimeout(function() {
            $window.location = '#!/index/main';
            setTimeout(function() {
                $('#myModal').modal("hide");

            }, 1);
        }, 500);


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