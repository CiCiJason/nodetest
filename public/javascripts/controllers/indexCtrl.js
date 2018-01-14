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
        } else {
            $scope.resultmsg = "用户名和邮箱不能为空";
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
                //$scope.hasVertifyCode = 1;
                $http({
                    method: "POST",
                    url: "/login/getVertifycode?" + accesstokenstring,
                    data: {
                        email: $scope.user.email
                    }
                }).then(function(data) {
                    $scope.userInfo.accountname = data.data.accountname;
                    $scope.userInfo.username = data.data.username;
                    $scope.userInfo.email = data.data.email;
                    $scope.userInfo.tel = data.data.tel;
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
        setTimeout(function() {

            setTimeout(function() {

                window.location = "#!/users/baseInfo";

                $('#myModal').modal("hide");

            }, 10);

            location.reload();

        }, 500);
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

    $scope.clearInfo(type) = function() {
        if (type == "1") {
            $scope.resultmsgaccountname = "";
        }
        if (type == "2") {
            $scope.resultmsgemail = "";
        }
    }

}]);