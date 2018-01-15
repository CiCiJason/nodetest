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
        var oldpassword = $scope.changePwdForm.oldpassword.$error.minlength || $scope.changePwdForm.oldpassword.$error.maxlength || $scope.changePwdForm.oldpassword.$error.required;
        var newpassword = $scope.changePwdForm.newpassword.$error.minlength || $scope.changePwdForm.newpassword.$error.maxlength || $scope.changePwdForm.newpassword.$error.required;
        var renewpassword = $scope.changePwdForm.renewpassword.$error.minlength || $scope.changePwdForm.renewpassword.$error.maxlength || $scope.changePwdForm.renewpassword.$error.required;        

        if(!oldpassword&&!newpassword&&!renewpassword){
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
                if(data.data.code==0){
                    $scope.user.oldpassword="";
                    $scope.user.newpassword="";
                    $scope.user.renewpassword="";                    
                }
    
            });
        }
    }

}]);