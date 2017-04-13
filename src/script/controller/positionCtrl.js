/**
 * Created by pc on 2017/4/7.
 */
/**
 * Created by pc on 2017/4/6.
 */
'use strict';
angular.module('app').controller('positionCtrl',['$q','$scope','$http','$state','cache',function ($q,$scope,$http,$state,cache) {
    $scope.isLogin=!!cache.get('name');
    $scope.message = $scope.isLogin?'投个简历':'去登陆';
    function getPosition() {
        var def = $q.defer();
        $http({
            method: 'GET',
            url: "/data/position.json?id="+$state.params.id
        }).then(function successCallback(response) {
            $scope.position = response.data;
            def.resolve(response.data)
        }, function errorCallback(response) {
            def.reject(response)
        });
        return def.promise;
    }
    function getCompany(id) {
      $http({
          method:'GET',
          url:'/data/company.json?id='+id
      }).then(function successCallback(response) {
          $scope.company = response.data;
      })
    }

    getPosition().then(function (obj) {
        getCompany(obj.companyId);
    });
    $scope.go = function () {
        if($scope.isLogin){
          $http.post('data/handle.json',{
              id:$scope.position.id
          }).success(function (resp) {
               $scope.message = '已投递';
          });
        }else{
            $state.go('login');
        }
    }
}]);