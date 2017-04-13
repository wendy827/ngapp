/**
 * Created by pc on 2017/4/6.
 */
'use strict';
angular.module('app').controller('companyCtrl',['$http','$scope','$state',function ($http,$scope,$state) {
    $http({
        method:'GET',
        url:'/data/company.json?id='+$state.params.id
    }).then(function successCallback(response) {
        $scope.company = response.data;
    })
}])