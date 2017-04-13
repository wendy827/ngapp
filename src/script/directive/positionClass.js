/**
 * Created by pc on 2017/4/12.
 */
/**
 * Created by pc on 2017/4/7.
 */
'use strict';
angular.module('app').directive('appPositionClass',[function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionClass.html',
        scope:{
            com:"="
        },
        link:function ($scope) {
            $scope.showPositionList = function (idx) {
                $scope.positionList = $scope.com.positionClass[idx].positionList;
                $scope.isActive = idx;
            }
            $scope.$watch('com',function (newVal,oldVal) {
                if(newVal){
                    $scope.showPositionList(0);
                }
            })

        }
    }
}])
