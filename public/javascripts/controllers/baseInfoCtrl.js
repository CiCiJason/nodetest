app.controller('baseInfoCtrl', ['$scope', '$http', '$window', '$sce', function($scope, $http, $window, $sce) {
    $scope.show = 1;
    $scope.warning = 0;
    $scope.userInfo = {};

    $scope.changeUserInfo = function() {
        $scope.show = !$scope.show;
    };

    $http({
        method: "GET",
        url: "/users/getUserInfo"
    }).then(function(data) {
        $scope.userInfo.accountname = data.data.accountname;
        $scope.userInfo.username = data.data.username;
        $scope.userInfo.email = data.data.email;
        $scope.userInfo.tel = data.data.tel;

    });

    $scope.saveUser = function() {
        if ($scope.userInfo.accountname && $scope.userInfo.username && $scope.userInfo.email && $scope.userInfo.tel) {
            $http({
                method: "GET",
                url: "/users/saveUserInfo",
                data: {
                    accountnam: $scope.userInfo.accountname,
                    username: $scope.userInfo.username,
                    email: $scope.userInfo.email,
                    tel: $scope.userInfo.tel,
                }
            }).then(function(data) {
                window.location.reload();
            });
        } else {
            $scope.warning = 1;
        }

    }

    $scope.canceledit = function() {
        $scope.show = !$scope.show;
    }

}]);