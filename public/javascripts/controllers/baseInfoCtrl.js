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

    $scope.option = {};
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

        $scope.data = data.data.OrderDetail;
        $scope.counts = data.data.counts;
        $scope.page = data.data.page;
        $scope.pages = data.data.pages;

        //设置分页的参数
        $scope.option = {
            curr: data.data.page || 1, //1, //当前页数
            all: data.data.pages || 10, //20, //总页数
            count: 10, //最多显示的页数，默认为10

            //点击页数的回调函数，参数page为点击的页数
            click: function(page) {
                //console.log(page);
                $http({
                    method: 'GET',
                    url: "/orders/getOrderInfo?" + accesstokenstring,
                    params: { 'page': page }
                }).then(function successCallback(data) {
                    // 请求成功执行代码

                    $scope.data = data.data.OrderDetail;
                    $scope.counts = data.data.counts;
                    $scope.page = data.data.page;
                    $scope.pages = data.data.pages;
                }, function errorCallback(data) {
                    //这里可以写跳转到某个页面等...
                    console.log("有错误");
                });
            }
        }

        //$scope.$watch('option.all', $scope.option.click(1));

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