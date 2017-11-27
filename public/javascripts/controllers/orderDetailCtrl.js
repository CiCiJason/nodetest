app.controller('orderDetailCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    var editor1 = new Simditor({
        textarea: $('#editor1'),
        // placeholder: '',
        // defaultImage: 'images/image.png',
        // params: {},
        // upload: false,
        // tabIndent: true,
        // toolbar: true,
        // toolbarFloat: true,
        // toolbarFloatOffset: 0,
        // toolbarHidden: false,
        // pasteImage: false,
        // cleanPaste: false
    });
    var editor2 = new Simditor({
        textarea: $('#editor2')
    });
    var editor3 = new Simditor({
        textarea: $('#editor3')
    });

    $scope.orderDetail = { samples: [] }; //orderdetail
    $scope.samples = $scope.orderDetail.samples; //sample lists



    function init() {
        $http({
            method: "GET",
            url: "/users/getDefaultInistitution"
        }).then(function(data) {
            $scope.institutionList = data.data;
            // $scope.orderDetail.institutionSelected = data.data[0].institutionName+"-"+data.data[0].department+"-"+data.data[0].secondaryDepartment+"-"+data.data[0].tertiaryDepartment;    
            $scope.orderDetail.institution = data.data[0]._id;
        });
        $http({
            method: "GET",
            url: "/users/getDefaultAddress"
        }).then(function(data) {
            $scope.addressList = data.data;
            //$scope.orderDetail.addressSelected = data.data[0].province+"-"+data.data[0].city+"-"+data.data[0].district+"-"+data.data[0].detailedAddress;    
            $scope.orderDetail.address = data.data[0]._id;
        });
        $http({
            method: "GET",
            url: "/orders/getDefaultOrderId"
        }).then(function(data) {
            $scope.orderDetail.orderId = data.data;
            //$scope.orderDetail.addressSelected = data.data[0].province+"-"+data.data[0].city+"-"+data.data[0].district+"-"+data.data[0].detailedAddress;    
            //$scope.orderDetail.address = data.data[0]._id;
        });
    }
    init();





    //提交保存表单
    $scope.orderSave = function() {
        if (true) {
            $http({
                method: "POST",
                url: '/orders/orderDetail',
                data: {
                    orderId: $scope.orderDetail.orderId,
                    proId: $scope.orderDetail.proId,
                    institution: $scope.orderDetail.institution,
                    address: $scope.orderDetail.address,
                    sequencingPlatform: $scope.orderDetail.sequencingPlatform,
                    readLong: $scope.orderDetail.readLong,
                    type: $scope.orderDetail.type,
                    laneNum: $scope.orderDetail.laneNum,
                    tagSelect: $scope.orderDetail.tagSelect,
                    library2100result: $scope.orderDetail.library2100result,
                    waybillNumber: $scope.orderDetail.waybillNumber,
                    modeOfTransport: $scope.orderDetail.modeOfTransport,
                    otherModeOfTransport: $scope.orderDetail.otherModeOfTransport,
                    carryHardDisk: $scope.orderDetail.carryHardDisk,
                    SNNum: $scope.orderDetail.SNNum,
                    totalNumberOfSamples: $scope.orderDetail.totalNumberOfSamples,
                    totalNumberOfTubes: $scope.orderDetail.totalNumberOfTubes,
                    sampleDescription: $scope.orderDetail.sampleDescription,
                    sampleSpecies: $scope.orderDetail.sampleSpecies,
                    constructionMethod: $scope.orderDetail.constructionMethod,
                    specificSequence: $scope.orderDetail.specificSequence,
                    remarks: $scope.orderDetail.remarks,
                    samples: $scope.samples,
                    institutionText: angular.element(":input[name=institution] option:selected").text(),
                    addressText: angular.element(":input[name=address] option:selected").text(),

                    id: $location.$$search._id
                }
            }).then(function(data) {
                // if (data.data.code == 0) {
                //     $scope.message = data.data.message;
                //     $('#myModal').modal("show");
                // } else {
                //     $scope.message = data.data.message;
                //     $('#myModal').modal("show");
                // }
                $window.location = '#!/users/baseInfo';
            });
        } else {
            $scope.message = "请填写完整的地址信息";
            $('#myModal').modal("show");
        };
    }


    $scope.closeModal = function() {
        setTimeout(function() {
            window.history.back();
            setTimeout(function() {
                $('#myModal').modal("hide");
            }, 1);
        }, 500);
    }


    $scope.addSample = function() {
        $scope.samples.push({});
    }


    if ($location.$$search._id && $location.$$search.type == 'edit') {
        $http({
            method: "GET",
            url: "/orders/getOneOrder",
            params: {
                id: $location.$$search._id
            }
        }).then(function(data) {
            $scope.orderDetail.orderId = data.data.orderId;
            $scope.orderDetail.proId = data.data.proId;
            $scope.orderDetail.institution = data.data.institution;
            $scope.orderDetail.address = data.data.address;
            $scope.orderDetail.sequencingPlatform = data.data.sequencingPlatform;
            $scope.orderDetail.readLong = data.data.readLong;
            $scope.orderDetail.type = data.data.type;
            $scope.orderDetail.laneNum = data.data.laneNum;
            $scope.orderDetail.tagSelect = data.data.tagSelect;
            $scope.orderDetail.library2100result = data.data.library2100result;
            $scope.orderDetail.waybillNumber = data.data.waybillNumber;
            $scope.orderDetail.modeOfTransport = data.data.modeOfTransport;
            $scope.orderDetail.otherModeOfTransport = data.data.otherModeOfTransport;
            $scope.orderDetail.carryHardDisk = data.data.carryHardDisk;
            $scope.orderDetail.SNNum = data.data.SNNum;
            $scope.orderDetail.totalNumberOfSamples = data.data.totalNumberOfSamples;
            $scope.orderDetail.totalNumberOfTubes = data.data.totalNumberOfTubes;
            $scope.orderDetail.sampleDescription = data.data.sampleDescription;
            $scope.orderDetail.sampleSpecies = data.data.sampleSpecies;
            $scope.orderDetail.constructionMethod = data.data.constructionMethod;
            $scope.orderDetail.specificSequence = data.data.specificSequence;
            $scope.orderDetail.remarks = data.data.remarks;
            $scope.samples = data.data.samples;
        });
    }


    // $scope.removeSample = function(index) {
    //     $scope.samples.splice(index, 1);
    // }


    $scope.removeSample = function(id, index) {
        if (id) {
            $http({
                method: "GET",
                url: "/orders/deleteSample",
                params: { id: id }
            }).then(function(data) {
                if (data.data.code == 0) {
                    $scope.samples.splice(index, 1);
                }
            });
        } else {
            $scope.samples.splice(index, 1);
        }

    }


    //$scope.uploader = new FileUploader();


}]);