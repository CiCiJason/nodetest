app.controller('addressCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

    $http({
        method: 'GET',
        url: '/users/getAddressLists'
    }).then(function(data) {

        $scope.data = data.data;

    });

    $scope.delete = function(id) {
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

}]);