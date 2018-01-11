app.controller('changePwdCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

    $scope.cancelPwd = function() {
        window.history.back();
    }

    $scope.user = {
        oldpassword: '',
        newpassword: '',
        renewpassword: ''
    };

    $scope.changePwd = function() {

        $http({
            method: 'POST',
            url: '/login/changePwd',
            data: {
                accountname: localStorage.getItem('loginName'),
                //accountId: localStorage.getItem('accountId'),
                oldpassword: md5($scope.user.oldpassword),
                newpassword: md5($scope.user.newpassword),
                renewpassword: md5($scope.user.renewpassword),
            }
        }).then(function(data) {

            $scope.message = data.data.message;
            $('#myModal').modal("show");

        });

    }

    $scope.closeModal = function() {

        $('#myModal').modal("hide");
        $scope.user = {};

    }


}]);