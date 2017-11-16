app.controller('orderDetailCtrl', ['$scope', '$http', '$window', '$sce', function($scope, $http, $window, $sce) {

    var editor = new Simditor({
        textarea: $('.editor'),
        placeholder: '',
        defaultImage: 'images/image.png',
        params: {},
        upload: false,
        tabIndent: true,
        toolbar: true,
        toolbarFloat: true,
        toolbarFloatOffset: 0,
        toolbarHidden: false,
        pasteImage: false,
        cleanPaste: false
    });


    $scope.orderDetail = {};

    //获取默认信息表编号，项目编号，默认机构，默认地址
    // $http({
    //     method: "GET",
    //     url: "/orders/getorderId"
    // }).then(function(data) {
    //     $scope.orderDetail.orderId = data.data.orderId;
    //     $scope.orderDetail.proId = data.data.proId;
    // });

    $http({
        method: "GET",
        url: "/users/getDefaultInistitution"
    }).then(function(data) {
        $scope.orderDetail.institution = data.data;
    });
    $http({
        method: "GET",
        url: "/users/getDefaultAddress"
    }).then(function(data) {
        $scope.orderDetail.address = data.data;
    });

    console.log($scope.orderDetail.institution);
    console.log($scope.orderDetail.address);

    $scope.orderDetail.institutionSelected = $scope.orderDetail.institution;
    $scope.orderDetail.addressSelected = $scope.orderDetail.address;

}]);