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
            url: "/users/getDefaultInistitution?" + accesstokenstring
        }).then(function(data) {
            $scope.institutionList = data.data;
            // $scope.orderDetail.institutionSelected = data.data[0].institutionName+"-"+data.data[0].department+"-"+data.data[0].secondaryDepartment+"-"+data.data[0].tertiaryDepartment;    
            $scope.orderDetail.institution = data.data[0]._id;
        });
        $http({
            method: "GET",
            url: "/users/getDefaultAddress?" + accesstokenstring
        }).then(function(data) {
            $scope.addressList = data.data;
            //$scope.orderDetail.addressSelected = data.data[0].province+"-"+data.data[0].city+"-"+data.data[0].district+"-"+data.data[0].detailedAddress;    
            $scope.orderDetail.address = data.data[0]._id;
        });
        $http({
            method: "GET",
            url: "/orders/getDefaultOrderId?" + accesstokenstring
        }).then(function(data) {
            $scope.orderDetail.orderId = data.data;
            //$scope.orderDetail.addressSelected = data.data[0].province+"-"+data.data[0].city+"-"+data.data[0].district+"-"+data.data[0].detailedAddress;    
            //$scope.orderDetail.address = data.data[0]._id;
        });
    }
    init();





    //提交保存表单
    $scope.orderSave = function() {
        $http({
            method: "POST",
            url: '/orders/orderDetail?' + accesstokenstring,
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

            setTimeout(function() {
                window.reload();
            }, 1);

            window.location = 'http://47.95.3.92:3000/#!/orders/myorders';
            //window.reload();

        });
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
            url: "/orders/getOneOrder?" + accesstokenstring,
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
                url: "/orders/deleteSample?" + accesstokenstring,
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


    //点击新增上传文件
    $scope.addAttachment = function() {

    };
    //inject angular file upload directives and service.angular.module('myApp', ['angularFileUpload']);var MyCtrl = [ '$scope', '$upload', function($scope, $upload) {
    $scope.onFileSelect = function($files) { //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: 'server/upload/url', //upload.php script, node.js route, or servlet url
                //method: 'POST' or 'PUT',
                //headers: {'header-key': 'header-value'},
                //withCredentials: true,
                data: { myObj: $scope.myModelObj },
                file: file, // or list of files ($files) for html5 only
                //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
                // customize file formData name ('Content-Disposition'), server side file variable name. 
                //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
                // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
                //formDataAppender: function(formData, key, val){}
            }).progress(function(evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function(data, status, headers, config) { // file is uploaded successfully
                console.log(data);
            }); //.error(...)
            //.then(success, error, progress); 
            // access or attach event listeners to the underlying XMLHttpRequest.
            //.xhr(function(xhr){xhr.upload.addEventListener(...)})
        } /* alternative way of uploading, send the file binary with the file's content-type.       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.        It could also be used to monitor the progress of a normal http post/put request with large data*/
        // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
    };


}]);