angular.module('cici.pagination', []).directive('ciciPagination', [function() {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            option: '=pageOption' //template里面的option和html里面的双向绑定
        },
        template: '<ul class="pagination">' +
            '<li ng-click="pageClick(p)" ng-repeat="p in page" class="{{option.curr==p?\'active\':\'\'}}">' +
            '<a href="javascript:;">{{p}}</a>' +
            '</li>' +
            '</ul>',
        link: function($scope) {
            //容错处理
            if (!$scope.option.curr || isNaN($scope.option.curr) || $scope.option.curr < 1) $scope.option.curr = 1;
            if (!$scope.option.all || isNaN($scope.option.all) || $scope.option.all < 1) $scope.option.all = 1;
            //all,总页数
            if ($scope.option.curr > $scope.option.all) $scope.option.curr = $scope.option.all;
            //count,最多显示的页数，默认为10
            if (!$scope.option.count || isNaN($scope.option.count) || $scope.option.count < 1) $scope.option.count = 10;


            //得到显示页数的数组
            $scope.page = getRange($scope.option.curr, $scope.option.all, $scope.option.count);

            //绑定点击事件
            $scope.pageClick = function(page) {
                if (page == '«') {
                    page = parseInt($scope.option.curr) - 1;
                } else if (page == '»') {
                    page = parseInt($scope.option.curr) + 1;
                }
                if (page < 1) page = 1;
                else if (page > $scope.option.all) page = $scope.option.all;
                //点击相同的页数 不执行点击事件
                if (page == $scope.option.curr) return;
                if ($scope.option.click && typeof $scope.option.click === 'function') {
                    $scope.option.click(page);
                    $scope.option.curr = page;
                    $scope.page = getRange($scope.option.curr, $scope.option.all, $scope.option.count);
                }

            };

            //返回页数范围（用来遍历）
            function getRange(curr, all, count) {
                //计算显示的页数
                curr = parseInt(curr);
                all = parseInt(all);
                count = parseInt(count);
                /**
                 * 如果count是偶数，from是当前数-偶数，to是当前数+偶数-1，总数是原偶数
                 * 如果count是奇数，from是当前数-小奇数，to是当前数+小奇数，总数是原奇数
                 */
                var from = curr - parseInt(count / 2);
                var to = curr + parseInt(count / 2) + (count % 2) - 1;
                //显示的页数容错处理
                if (from <= 0) {
                    from = 1;
                    to = from + count - 1;
                    if (to > all) {
                        to = all;
                    }
                }
                if (to > all) {
                    to = all;
                    from = to - count + 1;
                    if (from <= 0) {
                        from = 1;
                    }
                }
                var range = [];
                for (var i = from; i <= to; i++) {
                    range.push(i);
                }
                range.push('»');
                range.unshift('«');
                return range;
            }

        }
    }
}]);
