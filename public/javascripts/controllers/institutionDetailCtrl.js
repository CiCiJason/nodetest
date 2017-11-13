app.controller('institutionDetailCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {


    $scope.institutionDetail = {
        country: '',
        institutionName: '',
        department: '',
        secondaryDepartment: '',
        tertiaryDepartment: '',
        principal: '',
        remarks: ''
    };
    $scope.institutionSave = function() {
        if ($scope.institutionDetail.principal) {
            $http({
                method: 'POST',
                url: '/users/institutionDetail',
                data: {
                    country: $scope.institutionDetail.country,
                    institutionName: $scope.institutionDetail.institutionName,
                    department: $scope.institutionDetail.department,
                    secondaryDepartment: $scope.institutionDetail.secondaryDepartment,
                    tertiaryDepartment: $scope.institutionDetail.tertiaryDepartment,
                    principal: $scope.institutionDetail.principal,
                    remarks: $scope.institutionDetail.remarks,
                    accountName: localStorage.getItem('accountId')
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

    };


    $scope.institutionCancel = function() {
        window.location.href = "#!/users/institution";
    }

}]);