/**
 * Created by pc on 2017/4/7.
 */
'use strict';
angular.module('app').directive('appFoot',[function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/foot.html'
    }
}])