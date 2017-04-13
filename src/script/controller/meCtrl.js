/**
 * Created by pc on 2017/4/13.
 */
'use strict';
angular.module('app').controller('meCtrl',['$state','cache','$scope','$http',function ($state,cache,$scope,$http) {
   if(cache.get('name')){
       $scope.name = cache.get('name');
       $scope.image = cache.get('image');
   }
   $scope.logout = function () {
       cache.remove('id');
       cache.remove('name');
       cache.remove('image');
       $state.go('main');
   }
}])