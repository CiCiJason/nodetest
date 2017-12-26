app.controller('addressCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

    $http({
        method: 'GET',
        url: '/users/getAddressLists?' + accesstokenstring
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
                url: '/users/setDefaultAddress?' + accesstokenstring,
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
                url: '/users/addressDelete?' + accesstokenstring,
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