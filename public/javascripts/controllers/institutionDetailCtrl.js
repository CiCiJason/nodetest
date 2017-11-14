app.controller('institutionDetailCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {


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

    };

    $scope.closeModal = function() {
        setTimeout(function() {
            window.history.back();
            setTimeout(function() {
                $('#myModal').modal("hide");
            }, 1);
        }, 500);
    }


    $scope.institutionCancel = function() {
        window.location.href = "#!/users/institution";
    }

    if ($location.$$search._id && $location.$$search.type == 'edit') {
        $http({
            method: "GET",
            url: "/users/getOneInstitution",
            params: {
                id: $location.$$search._id
            }
        }).then(function(data) {
            $scope.institutionDetail.country = data.data.country;
            $scope.institutionDetail.institutionName = data.data.institutionName;
            $scope.institutionDetail.department = data.data.department;
            $scope.institutionDetail.secondaryDepartment = data.data.secondaryDepartment;
            $scope.institutionDetail.tertiaryDepartment = data.data.tertiaryDepartment;
            $scope.institutionDetail.principal = data.data.principal;
            $scope.institutionDetail.remarks = data.data.remarks;
        });
    }


}]);