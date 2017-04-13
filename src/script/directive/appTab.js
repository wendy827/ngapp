/**
 * Created by pc on 2017/4/12.
 */
'use strict';
angular.module('app').directive('appTab',[function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/tab.html',
        scope:{
            tabClick:"&",
            list:"="
        },
        link:function ($scope) {
            $scope.click = function (tab) {
                 $scope.selectId = tab.id;
                 $scope.tabClick(tab);
            }
        }
    }
}])