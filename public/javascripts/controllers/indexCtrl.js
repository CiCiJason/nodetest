app.controller('indexCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

    if (localStorage.getItem('loginName')) {
        $scope.logined = 0;
    } else {
        $scope.logined = 1;
    }

    $scope.login = 1;
    $scope.reg = 1;

    $scope.change = function() {
        $scope.login = !$scope.login;
        $scope.reg = !$scope.reg;
    };

    $scope.user = {};

    $scope.hasVertifyCode = 0;
    /**
     * 登录
     */
    $scope.loginSubmit = function() {
        var accountname = $scope.loginForm.accountname.$error.minlength || $scope.loginForm.accountname.$error.maxlength || $scope.loginForm.accountname.$error.required;
        var password = $scope.loginForm.password.$error.minlength || $scope.loginForm.password.$error.maxlength || $scope.loginForm.password.$error.required;
        if (!accountname && !password) {
            $http({
                method: 'POST',
                url: '/login',
                data: {
                    accountname: $scope.user.accountname,
                    password: md5($scope.user.password)
                }
            }).then(function(data) {
                if (data.data.code == 0) {
                    //$scope.message = data.data.message;
                    localStorage.setItem('access_token', data.data.access_token);
                    localStorage.setItem('loginName', data.data.accountname);
                    localStorage.setItem('accountId', data.data.userId);

                    window.location.href = "#!/index/main";
                    setTimeout(function() {
                        location.reload();
                    }, 10);

                } else {
                    $scope.resultmsg = data.data.message;
                    //$('#myModal').modal("show");
                }
            });
        }
    };

    /**
     * 注册
     */
    $scope.regSubmit = function() {
        var accountname = $scope.regForm.accountname.$error.minlength || $scope.regForm.accountname.$error.maxlength || $scope.regForm.accountname.$error.required;
        var password = $scope.regForm.password.$error.minlength || $scope.regForm.password.$error.maxlength || $scope.regForm.password.$error.required;
        var repassword = $scope.regForm.password.$error.required;
        var email = $scope.regForm.email.$error.email;
        var vertifycode = $scope.regForm.vertifycode.$error.minlength || $scope.regForm.vertifycode.$error.maxlength || $scope.regForm.vertifycode.$error.required;

        if (!accountname && !password && !repassword && !email) {
            if (!$scope.hasVertifyCode && $scope.resultmsgaccountname == "" && $scope.resultmsgemail == "") {
                $http({
                    method: "POST",
                    url: "/login/getVertifycode",
                    data: {
                        email: $scope.user.email
                    }
                }).then(function(data) {
                    if (data.data.code == 0) {
                        $scope.hasVertifyCode = 1;
                    }
                });
            } else {
                if (!vertifycode) {
                    $http({
                        method: 'POST',
                        url: '/login/register',
                        data: {
                            accountname: $scope.user.accountname,
                            password: md5($scope.user.password),
                            repassword: md5($scope.user.repassword),
                            email: $scope.user.email,
                            vertifycode: $scope.user.vertifycode
                        }
                    }).then(function(data) {
                        if (data.data.code == 0) {
                            $scope.message = data.data.message;
                            $('#myModal').modal("show");
                        } else {
                            $scope.resultmsg = data.data.message;
                        }
                    });
                }
            }
        }
    }

    $scope.closeModal = function() {
        $('#myModal').modal("hide");
        location.reload();
    }

    $scope.querySameUser = function(name) {
        var accountname = $scope.regForm.accountname.$error.minlength || $scope.regForm.accountname.$error.maxlength || $scope.regForm.accountname.$error.required;
        var email = $scope.regForm.email.$error.email;
        if (name == "1" && !accountname) {
            if ($scope.user.accountname) {
                $http({
                    method: 'POST',
                    url: '/login/register',
                    data: {
                        accountname: $scope.user.accountname,
                        ensure: "accountname"
                    }
                }).then(function(data) {
                    if (data.data.code != 0) {
                        $scope.resultmsgaccountname = data.data.message;
                    } else {
                        $scope.resultmsgaccountname = "";
                    }
                });
            }
        }
        if (name == "2" && !email) {
            if ($scope.user.email) {
                $http({
                    method: 'POST',
                    url: '/login/register',
                    data: {
                        email: $scope.user.email,
                        ensure: "email"
                    }
                }).then(function(data) {
                    if (data.data.code != 0) {
                        $scope.resultmsgemail = data.data.message;
                    } else {
                        $scope.resultmsgemail = "";
                    }
                });
            }
        }
    }

    $scope.clearInfo = function(type) {
        if (type == "1") {
            $scope.resultmsgaccountname = "";
        }
        if (type == "2") {
            $scope.resultmsgemail = "";
        }
    }

}]);