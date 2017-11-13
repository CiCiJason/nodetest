app.controller('institutionCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

    $http({
        method: 'GET',
        url: '/users/getInistitutionLists',
        data: {
            accountName: localStorage.getItem('accountId')
        }
    }).then(function(data) {

        $scope.data = data.data;

    });



}]);