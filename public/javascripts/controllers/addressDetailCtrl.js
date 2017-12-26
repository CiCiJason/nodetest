app.controller('addressDetailCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {


    var citylist = citys.citylist;

    $scope.addressDetail = {
        country: '中国',
        province: province,
        city: '',
        district: '',
        detailedAddress: '',
        ZipCode: '',
        contactPerson: '',
        contactTel: ''
    };

    $scope.province = [];
    for (var i = 0; i < citylist.length; i++) {
        $scope.province.push(citylist[i].p)
    }

    $scope.changeCity = function() {
        $scope.city = [];
        for (var i = 0; i < citylist.length; i++) {
            if ($scope.addressDetail.province == citylist[i].p) {
                if (citylist[i].c) {
                    for (var j = 0; j < citylist[i].c.length; j++) {
                        $scope.city.push(citylist[i].c[j].n);
                    }
                }
            }
        }
    }
    $scope.changeDistrict = function() {
        $scope.district = [];
        for (var i = 0; i < citylist.length; i++) {
            if ($scope.addressDetail.province == citylist[i].p) { //找到省
                for (var j = 0; j < citylist[i].c.length; j++) {
                    if ($scope.addressDetail.city == citylist[i].c[j].n) { //找到市
                        if (citylist[i].c[j].a) {
                            for (var k = 0; k < citylist[i].c[j].a.length; k++) {
                                $scope.district.push(citylist[i].c[j].a[k].s);
                            }
                            break;
                        }
                    }
                }
            }
        }
    }


    $scope.addressSave = function() {
        if ($scope.addressDetail.detailedAddress && $scope.addressDetail.contactPerson && $scope.addressDetail.contactTel) {
            $http({
                method: "POST",
                url: '/users/addressDetail?' + accesstokenstring,
                data: {
                    country: $scope.addressDetail.country,
                    province: $scope.addressDetail.province,
                    city: $scope.addressDetail.city,
                    district: $scope.addressDetail.district,
                    detailedAddress: $scope.addressDetail.detailedAddress,
                    ZipCode: $scope.addressDetail.ZipCode,
                    contactPerson: $scope.addressDetail.contactPerson,
                    contactTel: $scope.addressDetail.contactTel,
                    accountName: localStorage.getItem('accountId'),
                    id: $location.$$search._id
                }
            }).then(function(data) {
                if (data.data.code == 0) {
                    $scope.message = data.data.message;
                    $('#myModal').modal("show");

                } else {
                    $scope.message = data.data.message;
                    $('#myModal').modal("show");
                }
            });
        } else {

            $scope.message = "请填写完整的地址信息";
            $('#myModal').modal("show");

        }
    }



    $scope.closeModal = function() {
        setTimeout(function() {
            window.history.back();
            setTimeout(function() {
                $('#myModal').modal("hide");
            }, 1);
        }, 500);
    }

    $scope.addressCancel = function() {
        window.location.href = "#!/users/address";
    }


    if ($location.$$search._id && $location.$$search.type == 'edit') {
        $http({
            method: "GET",
            url: "/users/getOneAddress?" + accesstokenstring,
            params: {
                id: $location.$$search._id
            }
        }).then(function(data) {
            $scope.addressDetail.country = data.data.country;
            $scope.addressDetail.province = data.data.province;
            $scope.addressDetail.city = data.data.city;
            $scope.addressDetail.district = data.data.district;
            $scope.addressDetail.detailedAddress = data.data.detailedAddress;
            $scope.addressDetail.ZipCode = data.data.ZipCode;
            $scope.addressDetail.contactPerson = data.data.contactPerson;
            $scope.addressDetail.contactTel = data.data.contactTel;
            $scope.$watch('addressDetail.province', $scope.changeCity());
            $scope.$watch('addressDetail.city', $scope.changeDistrict());
        });
    }


}]);