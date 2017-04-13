/**
 * Created by pc on 2017/4/12.
 */
/**
 * Created by pc on 2017/4/6.
 */
'use strict';
angular.module('app').controller('searchCtrl',['dict','$scope','$http',function (dict,$scope,$http) {
    $scope.name='';
    $scope.search  = function () {
        $http({
            method: 'GET',
            url: 'data/positionList.json?name='+$scope.name
        }).then(function successCallback(response) {
            $scope.list = response.data;
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
    };
 $scope.search();
 $scope.sheet = {};
 $scope.tabList=[{
         id:'city',
         name:'城市'
     },
     {
         id:'salary',
         name:'薪资'
     },
     {
         id:'scale',
         name:'公司规模'
     }
 ];
 $scope.filterObj = {};
 var tabId='';
 $scope.tClick = function (id,name) {
     tabId=id;
    $scope.sheet.list = dict[id];
    $scope.sheet.visible = true;
 };
 $scope.sClick = function (id,name) {
     if(id){
         angular.forEach($scope.tabList,function (item) {
             if(item.id===tabId){
                 item.name=name
             }
         });
         $scope.filterObj[tabId+"Id"]=id;
     }else {
         delete  $scope.filterObj[tabId+"Id"];
         angular.forEach($scope.tabList,function (item) {
             if(item.id===tabId){
                 switch (item.id){
                     case 'city':
                         item.name="城市";
                         break;
                     case 'salary':
                         item.name="薪资";
                         break;
                     case 'scale':
                         item.name="公司规模";
                         break;
                 }
             }
         })
     }
 }

}])