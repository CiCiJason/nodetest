app.controller('institutionCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    $http({
        method: 'GET',
        url: '/users/getInistitutionLists'
    }).then(function(data) {

        $scope.data = data.data;

    });

    $scope.delete = function(id) {
        $scope.deleteid = id;
        $('#myModal').modal("show");
    }

    $scope.setDefault = function(id) {
        if (id) {
            $http({
                method: 'GET',
                url: '/users/setDefaultInistitution',
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
                url: '/users/inistitutionDelete',
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