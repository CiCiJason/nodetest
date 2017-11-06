app.controller('addressCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {


    $scope.addressDetail = {
        country: '中国',
        province: '',
        city: '',
        district: '',
        detailedAddress: '',
        ZipCode: '',
        contactPerson: '',
        contactTel: ''
    };
    $scope.addressSave = function() {

        $http({
            method: 'POST',
            url: '/api/address',
            data: { addressDetail: $scope.addressDetail }
        }).then(function(data) {
            if (!data.data.code) {

                alert(data.data.message);
                // $window.location.reload();
                $scope.addressDetail = {
                    country: '中国',
                    province: '',
                    city: '',
                    district: '',
                    detailedAddress: '',
                    ZipCode: '',
                    contactPerson: '',
                    contactTel: ''
                };

            } else {
                alert(data.data.message);
            }

        });
    };


    $scope.addressCancel = function() {
        window.location.href = "#!/users/address";
    }

}]);