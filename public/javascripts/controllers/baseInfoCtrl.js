app.controller('baseInfoCtrl', ['$scope', '$http', '$window', '$sce', function($scope, $http, $window, $sce) {
    $scope.showUser = 1;


    $scope.changeUserInfo = function() {
        $scope.showUser = !$scope.showUser;
    };



}]);