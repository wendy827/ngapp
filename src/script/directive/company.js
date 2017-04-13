/**
 * Created by pc on 2017/4/12.
 */
/**
 * Created by pc on 2017/4/7.
 */
'use strict';
angular.module('app').directive('appCompany',[function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/company.html',
        scope:{
            com:"="
        }
    }
}])
