app.controller('addressCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {


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
                url: '/users/addressDetail',
                data: {
                    country: $scope.addressDetail.country,
                    province: $scope.addressDetail.province,
                    district: $scope.addressDetail.district,
                    detailedAddress: $scope.addressDetail.detailedAddress,
                    ZipCode: $scope.addressDetail.ZipCode,
                    contactPerson: $scope.addressDetail.contactPerson,
                    contactTel: $scope.addressDetail.contactTel
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
        $('#myModal').modal("hide");
    }


}]);