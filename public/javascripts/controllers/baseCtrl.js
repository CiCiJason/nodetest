app.controller('baseCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {


    $scope.loginName = localStorage.getItem('loginName');



    $scope.logout = function() {
        localStorage.clear();
        window.location = "http://47.95.3.92:3000/#!/login";
    }


}]);