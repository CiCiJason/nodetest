app.controller('addressCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {


    var citylist = citys.citylist;

    var province = [];
    for (var i = 0, length = citylist.length; i < length; i++) {
        province.push(citylist[i].p);
    }






    // function cmbSelect(cmb, str) {
    //     for (var i = 0; i < cmb.options.length; i++) {
    //         if (cmb.options[i].value == str) {
    //             cmb.selectedIndex = i;
    //             return;
    //         }
    //     }
    // }

    //cmbSelect(province, provinceindex)

    $scope.changeProvince = function() {

        //cmbSelect(province, value);
        alert(1);
    }



    $scope.addressDetail = {
        country: '中国',
        province: province,
        city: '',
        district: '',
        detailedAddress: '',
        ZipCode: '',
        contactPerson: '',
        contactTel: ''
    };

}]);



/*var addressInit = function(_cmbProvince, _cmbCity, _cmbArea, defaultProvince, defaultCity, defaultArea) {
    var cmbProvince = document.getElementById(_cmbProvince);
    var cmbCity = document.getElementById(_cmbCity);
    var cmbArea = document.getElementById(_cmbArea);

    function cmbSelect(cmb, str) {
        for (var i = 0; i < cmb.options.length; i++) {
            if (cmb.options[i].value == str) {
                cmb.selectedIndex = i;
                return;
            }
        }
    }

    function cmbAddOption(cmb, str, obj) {
        var option = document.createElement("OPTION");
        cmb.options.add(option);
        option.innerText = str;
        option.value = str;
        option.obj = obj;
    }

    function changeCity() {
        cmbArea.options.length = 0;
        if (cmbCity.selectedIndex == -1) return;
        var item = cmbCity.options[cmbCity.selectedIndex].obj;
        for (var i = 0; i < item.areaList.length; i++) {
            cmbAddOption(cmbArea, item.areaList[i], null);
        }
        cmbSelect(cmbArea, defaultArea);
    }

    function changeProvince() {
        cmbCity.options.length = 0;
        cmbCity.onchange = null;
        if (cmbProvince.selectedIndex == -1) return;
        var item = cmbProvince.options[cmbProvince.selectedIndex].obj;
        for (var i = 0; i < item.cityList.length; i++) {
            cmbAddOption(cmbCity, item.cityList[i].name, item.cityList[i]);
        }
        cmbSelect(cmbCity, defaultCity);
        changeCity();
        cmbCity.onchange = changeCity;
    }

    for (var i = 0; i < provinceList.length; i++) {
        cmbAddOption(cmbProvince, provinceList[i].name, provinceList[i]);
    }
    cmbSelect(cmbProvince, defaultProvince); //返回省的索引，即有了数组的索引
    changeProvince();
    cmbProvince.onchange = changeProvince;
}
*/
//{ "p": "江苏", "c": [{ "n": "南京", "a": [{ "s": "玄武区" }, { "s": "白下区" }, { "s": "秦淮区" }, { "s": "建邺区" }, { "s": "鼓楼区" }, { "s": "下关区" }, { "s": "浦口区" }, { "s": "栖霞区" }, { "s": "雨花台区" }, { "s": "江宁区" }, { "s": "六合区" }, { "s": "溧水县" }, { "s": "高淳县" }] }, { "n": "无锡", "a": [{ "s": "崇安区" }, { "s": "南长区" }, { "s": "北塘区" }, { "s": "锡山区" }, { "s": "惠山区" }, { "s": "滨湖区" }, { "s": "江阴市" }, { "s": "宜兴市" }] }, { "n": "徐州", "a": [{ "s": "鼓楼区" }, { "s": "云龙区" }, { "s": "九里区" }, { "s": "贾汪区" }, { "s": "泉山区" }, { "s": "丰县" }, { "s": "沛县" }, { "s": "铜山县" }, { "s": "睢宁县" }, { "s": "新沂市" }, { "s": "邳州市" }] }, { "n": "常州", "a": [{ "s": "天宁区" }, { "s": "钟楼区" }, { "s": "戚墅堰区" }, { "s": "新北区" }, { "s": "武进区" }, { "s": "溧阳市" }, { "s": "金坛市" }] }, { "n": "苏州", "a": [{ "s": "沧浪区" }, { "s": "平江区" }, { "s": "金阊区" }, { "s": "虎丘区" }, { "s": "吴中区" }, { "s": "相城区" }, { "s": "常熟市" }, { "s": "张家港市" }, { "s": "昆山市" }, { "s": "吴江市" }, { "s": "太仓市" }] }, { "n": "南通", "a": [{ "s": "崇川区" }, { "s": "港闸区" }, { "s": "海安县" }, { "s": "如东县" }, { "s": "启东市" }, { "s": "如皋市" }, { "s": "通州市" }, { "s": "海门市" }] }, { "n": "连云港", "a": [{ "s": "连云区" }, { "s": "新浦区" }, { "s": "海州区" }, { "s": "赣榆县" }, { "s": "东海县" }, { "s": "灌云县" }, { "s": "灌南县" }] }, { "n": "淮安", "a": [{ "s": "清河区" }, { "s": "楚州区" }, { "s": "淮阴区" }, { "s": "清浦区" }, { "s": "涟水县" }, { "s": "洪泽县" }, { "s": "盱眙县" }, { "s": "金湖县" }] }, { "n": "盐城", "a": [{ "s": "亭湖区" }, { "s": "盐都区" }, { "s": "响水县" }, { "s": "滨海县" }, { "s": "阜宁县" }, { "s": "射阳县" }, { "s": "建湖县" }, { "s": "东台市" }, { "s": "大丰市" }] }, { "n": "扬州", "a": [{ "s": "广陵区" }, { "s": "邗江区" }, { "s": "维扬区" }, { "s": "宝应县" }, { "s": "仪征市" }, { "s": "高邮市" }, { "s": "江都市" }] }, { "n": "镇江", "a": [{ "s": "京口区" }, { "s": "润州区" }, { "s": "丹徒区" }, { "s": "丹阳市" }, { "s": "扬中市" }, { "s": "句容市" }] }, { "n": "泰州", "a": [{ "s": "海陵区" }, { "s": "高港区" }, { "s": "兴化市" }, { "s": "靖江市" }, { "s": "泰兴市" }, { "s": "姜堰市" }] }, { "n": "宿迁", "a": [{ "s": "宿城区" }, { "s": "宿豫区" }, { "s": "沭阳县" }, { "s": "泗阳县" }, { "s": "泗洪县" }] }] }