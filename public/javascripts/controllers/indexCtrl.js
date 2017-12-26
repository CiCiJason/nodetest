app.controller('indexCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.login = 1;
    $scope.reg = 1;

    $scope.change = function() {
        $scope.login = !$scope.login;
        $scope.reg = !$scope.reg;
    };

    /**
     * 登录
     */
    $scope.loginSubmit = function() {
        $http({
            method: 'POST',
            url: '/login',
            data: {
                accountname: $scope.user.accountname,
                password: md5($scope.user.password)
            }
        }).then(function(data) {
            if (data.data.code == 0) {
                $scope.message = data.data.message;
                localStorage.setItem('access_token', data.data.access_token);
                localStorage.setItem('loginName', data.data.accountname);
                localStorage.setItem('accountId', data.data.userId);

                location.reload();

                setTimeout(function() {
                    window.location = "#!/users/baseInfo";
                }, 1);

            } else {
                $scope.message = data.data.message;

                $('#myModal').modal("show");

            }

            // }, function(data) {
            //     // Erase the token if the user fails to log in
            //     delete $window.sessionStorage.token;

            //     // Handle login errors here
            //     // $scope.message = 'Error: Invalid user or password';
        });
    };

    /**
     * 注册
     */
    $scope.regSubmit = function() {
        $http({
            method: 'POST',
            url: '/login/register',
            data: {
                accountname: $scope.user.accountname,
                password: md5($scope.user.password),
                repassword: md5($scope.user.repassword),
                email: $scope.user.email
            }
        }).then(function(data) {
            console.log(data);
            if (data.data.code == 0) {
                //console.log(data.data.message);
                $scope.message = data.data.message;
                //showMessage($scope, data.data.message);
                $('#myModal').modal("show");
            } else {
                $scope.message = data.data.message;
                //showMessage($scope, data.data.message);
                $('#myModal').modal("show");
                //console.log(data.data.message);
            }

            // }, function(data) {
            //     // Erase the token if the user fails to log in
            //     delete $window.sessionStorage.token;

            //     // Handle login errors here
            //     // $scope.message = 'Error: Invalid user or password';
        });
    }

    $scope.closeModal = function() {
        setTimeout(function() {

            setTimeout(function() {

                window.location = "#!/users/baseInfo";

                $('#myModal').modal("hide");

            }, 10);

            location.reload();

        }, 500);
    }

}]);