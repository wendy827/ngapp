/**
 * Created by pc on 2017/4/13.
 */
'use strict';
angular.module('app').controller('loginCtrl',['cache','$state','$scope','$http',function (cache,$state,$scope,$http) {
     $scope.submit = function () {
         $http.post('data/login.json',$scope.user).success(function (resp) {
            cache.put('id',resp.data.id);
             cache.put('name',resp.data.name);
             cache.put('image',resp.data.image);
             $state.go('main');
         })
     }
}])