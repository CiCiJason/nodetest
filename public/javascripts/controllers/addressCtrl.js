app.controller('addressCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

    $http({
        method: 'GET',
        url: '/users/getAddressLists'
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
                url: '/users/setDefaultAddress',
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
                url: '/users/addressDelete',
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