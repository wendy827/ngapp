/**
 * Created by pc on 2017/4/13.
 */
'use strict';
angular.module('app').config(['$provide',function ($provide) {
    $provide.decorator('$http',['$delegate','$q',function ($delegate,$q) {
        //var get = $delegate.get;
        $delegate.post = function (url,data,config) {
            var def = $q.defer();
           /* $delegate.get(url).success(function (resp) {
                 def.resolve(resp)
            }).error(function (err) {
                def.reject(err)
            }*/
            $delegate.get(url).then(function successCallback(response) {
                def.resolve(response)
            }, function errorCallback(response) {
                def.reject(response)
            })
            return {
                success:function (cb) {
                    def.promise.then(cb)
                },
                error:function (cb) {
                    def.promise.then(null,cb)
                }
            }
        }
        return $delegate;
    }])
}])