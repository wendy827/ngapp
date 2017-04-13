/**
 * Created by pc on 2017/4/7.
 */
'use strict';
angular.module('app').directive('appHeadBar',[function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/headBar.html',
        scope:{
            text:'='
        },
        link:function (scope) {
            scope.back=function () {
                window.history.back();
            }
        }
    }
}])
