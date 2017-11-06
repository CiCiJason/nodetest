app.controller('institutionCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {


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

        $http({
            method: 'POST',
            url: '/api/institution',
            data: { institutionDetail: $scope.institutionDetail }
        }).then(function(data) {
            if (!data.data.code) {

                alert(data.data.message);
                // $window.location.reload();
                $scope.institutionDetail = {};

            } else {
                alert(data.data.message);
            }

        });
    };


    $scope.institutionCancel = function() {
        window.location.href = "#!/users/institution";
    }

}]);