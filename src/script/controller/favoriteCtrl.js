/**
 * Created by pc on 2017/4/13.
 */
'use strict';
angular.module('app').controller('favoriteCtrl',['$scope','$http',function ($scope,$http) {
       $http.get('data/myFavorite.json').then(function (resp) {
            $scope.positionList = resp.data;
       })
}])