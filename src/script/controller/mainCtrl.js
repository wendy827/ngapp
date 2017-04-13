/**
 * Created by pc on 2017/4/6.
 */
'use strict';
angular.module('app').controller('mainCtrl',['$scope','$http',function ($scope,$http) {
    $http({
        method: 'GET',
        url: 'data/positionList.json'
    }).then(function successCallback(response) {
        $scope.list = response.data;
    }, function errorCallback(response) {
        // 请求失败执行代码
    });
}])