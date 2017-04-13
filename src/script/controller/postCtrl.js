/**
 * Created by pc on 2017/4/13.
 */
'use strict';
angular.module('app').controller('postCtrl',['$scope','$http',function ($scope,$http) {
    $scope.tabList = [{
        id:"all",
        name:"全部"
    },{
        id:"pass",
        name:"邀请面试"
    },{
        id:"fail",
        name:"不合适"
    }];
    $http.get('data/myPost.json').then(function (resp) {
        $scope.postList = resp.data;
    });
    $scope.filterObj = {};
     $scope.tClick = function (id,name) {
         switch (id){
             case 'all':
                 delete $scope.filterObj.state;
                 break;
             case 'pass':
                 $scope.filterObj.state='1';
                 break;
             case 'fail':
                 $scope.filterObj.state='-1';
                 break;
         }
     }
}])