app.controller('baseCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {


    $scope.loginName = localStorage.getItem('loginName');



    $scope.logout = function() {
        localStorage.clear();
        window.location = "/login";
    }


}]);