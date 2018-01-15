app.controller('institutionCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    $scope.option = {};

    var getInistitutionLists = function() {
        $http({
            method: 'GET',
            url: '/users/getInistitutionLists?' + accesstokenstring
        }).then(function(data) {

            $scope.data = data.data.institution;

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
                        url: "/users/getInistitutionLists?" + accesstokenstring,
                        params: { 'page': page }
                    }).then(function successCallback(data) {
                        // 请求成功执行代码

                        $scope.data = data.data.institution;
                        $scope.counts = data.data.counts;
                        $scope.page = data.data.page;
                        $scope.pages = data.data.pages;
                    }, function errorCallback(data) {
                        //这里可以写跳转到某个页面等...
                        console.log("有错误");
                    });
                }
            }

            $scope.$watch($scope.option.page);

        });
    }

    getInistitutionLists();


    $scope.delete = function(id) {
        $scope.deleteid = id;
        $('#myModal').modal("show");
    }

    $scope.setDefault = function(id) {
        if (id) {
            $http({
                method: 'GET',
                url: '/users/setDefaultInistitution?' + accesstokenstring,
                params: {
                    id: id
                }
            }).then(function(data) {

                $window.location.reload()

            });
        }
    }

    $scope.ensure = function(id) {
        if (id) {
            $http({
                method: 'GET',
                url: '/users/inistitutionDelete?' + accesstokenstring,
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


    $scope.query = function() {
        if ($scope.institutionquery.country || $scope.institutionquery.institutionName) {
            $http({
                method: 'GET',
                url: '/users/getInistitutionLists?' + accesstokenstring,
                params: {
                    querycountry: $scope.institutionquery.country,
                    queryinstitutionName: $scope.institutionquery.institutionName
                }
            }).then(function(data) {

                $scope.data = data.data.institution;

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
                            url: "/users/getInistitutionLists?" + accesstokenstring,
                            params: { 'page': page }
                        }).then(function successCallback(data) {
                            // 请求成功执行代码

                            $scope.data = data.data.institution;
                            $scope.counts = data.data.counts;
                            $scope.page = data.data.page;
                            $scope.pages = data.data.pages;
                        }, function errorCallback(data) {
                            //这里可以写跳转到某个页面等...
                            console.log("有错误");
                        });
                    }
                }

                //$scope.$watch($scope.option.page);

            });
        }
    }

    $scope.queryCancel = function() {
        if ($scope.institutionquery.country || $scope.institutionquery.institutionName) {
            $scope.institutionquery.country = "";
            $scope.institutionquery.institutionName = "";
            getInistitutionLists();
        }
    }


}]);