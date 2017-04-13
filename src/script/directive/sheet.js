/**
 * Created by pc on 2017/4/12.
 */
'use strict';
angular.module('app').directive('appSheet',[function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/sheet.html',
        scope:{
            list:"=",
            visible:"=",
            select:"&"
        }
    }
}])