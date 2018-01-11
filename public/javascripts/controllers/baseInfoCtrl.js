app.controller('baseInfoCtrl', ['$scope', '$http', '$window', '$sce', function($scope, $http, $window, $sce) {
    $scope.show = 1;
    $scope.warning = 0;
    $scope.userInfo = {};

    $scope.changeUserInfo = function() {
        $scope.show = !$scope.show;
    };

    $http({
        method: "GET",
        url: "/users/getUserInfo?" + accesstokenstring
    }).then(function(data) {
        $scope.userInfo.accountname = data.data.accountname;
        $scope.userInfo.username = data.data.username;
        $scope.userInfo.email = data.data.email;
        $scope.userInfo.tel = data.data.tel;
    });

    /**
     * 显示样品列表
     */

    $http({
        method: "GET",
        url: "/orders/getOrderInfo?" + accesstokenstring
    }).then(function(data) {
        for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].type == '1') {
                data.data[i].type = '文库无需世和混合，包lane';
            }
            if (data.data[i].type == '2') {
                data.data[i].type = '文库需世和混合上机，包lane';
            }
            if (data.data[i].type == '3') {
                data.data[i].type = '需要世和混合上机，不包lane包G';
            }
            if (data.data[i].type == '4') {
                data.data[i].type = '文库无需世和混合，包FC(flow cell)';
            }
        }

        $scope.data = data.data;






    });



    $scope.saveUser = function() {
        if ($scope.userInfo.accountname && $scope.userInfo.username && $scope.userInfo.email && $scope.userInfo.tel) {
            $http({
                method: "POST",
                url: "/users/saveUserInfo?" + accesstokenstring,
                data: {
                    accountname: $scope.userInfo.accountname,
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


    $scope.delete = function(id) {
        $scope.deleteid = id;
        $('#myModal').modal("show");
    }

    $scope.ensure = function(id) {
        if (id) {
            $http({
                method: 'GET',
                url: '/orders/orderDelete?' + accesstokenstring,
                params: {
                    id: id
                }
            }).then(function(data) {

                $window.location.reload()

            });
        }
    }
    $scope.closeModal = function() {
        $('#myModal').modal("hide");
    }

}]);