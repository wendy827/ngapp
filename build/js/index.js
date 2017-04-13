/**
 * Created by pc on 2017/4/6.
 */
'use strict';
angular.module('app',['ui.router','ngCookies','validation','ngAnimate']);
/**
 * Created by pc on 2017/4/12.
 */
'use strict';
angular.module('app').value('dict',{}).run(['dict','$http',function (dict,$http) {
    $http.get('data/city.json').then(function(resp){
        dict.city = resp.data;
    });

    $http.get('data/salary.json').then(function(resp){
        dict.salary = resp.data;
    });

    $http.get('data/scale.json').then(function(resp){
        dict.scale = resp.data;
    });

}])
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
/**
 * Created by pc on 2017/4/6.
 */
'use strict';
angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('main',{
        url:'/main',
        templateUrl:'view/main.html',
        controller:"mainCtrl"
    }).state('position',{
        url:'/position/:id',
        templateUrl:'view/position.html',
        controller:"positionCtrl"
    }).state('company',{
        url:'/company/:id',
        templateUrl:'view/company.html',
        controller:"companyCtrl"
    }).state('search',{
        url:'/search',
        templateUrl:'view/search.html',
        controller:"searchCtrl"
    }).state('login',{
        url:'/login',
        templateUrl:'view/login.html',
        controller:"loginCtrl"
    }).state('register',{
        url:'/register',
        templateUrl:'view/register.html',
        controller:"registerCtrl"
    }).state('me',{
        url:'/me',
        templateUrl:'view/me.html',
        controller:"meCtrl"
    }).state('favorite',{
        url:'/favorite',
        templateUrl:'view/favorite.html',
        controller:"favoriteCtrl"
    }).state('post',{
        url:'/post',
        templateUrl:'view/post.html',
        controller:"postCtrl"
    });
    $urlRouterProvider.otherwise('main');
}])
/**
 * Created by pc on 2017/4/13.
 */
'use strict';
angular.module('app').config(['$validationProvider',function ($validationProvider) {
    var expression = {
       phone:/^1[\d]{10}$/,
        password:function (value) {
           var str = value+'';
            return str.length>5;
        },
        required:function (value) {
            return !!value;
        }
    };
    var defaultMsg = {
        phone:{
            success:'',
            error:"必须是11位手机号"
        },
        password:{
            success:'',
            error:"密码长度至少6位"
        },
        required:{
            success:'',
            error:"不能为空"
        }
    };
  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);

}]);
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
/**
 * Created by pc on 2017/4/13.
 */
'use strict';
angular.module('app').controller('favoriteCtrl',['$scope','$http',function ($scope,$http) {
       $http.get('data/myFavorite.json').then(function (resp) {
            $scope.positionList = resp.data;
       })
}])
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
/**
 * Created by pc on 2017/4/13.
 */
'use strict';
angular.module('app').controller('registerCtrl',['$interval','$scope','$http','$state',function ($interval,$scope,$http,$state) {
    $scope.submit = function () {
       $http.post('data/regist.json',$scope.user).success(function (resp) {
           $state.go('login');
       })
    };
    var count = 60;
    $scope.send = function () {
       $http({
           method:'GET',
           url:'data/code.json'
       }).then(function (res) {
          if(1===res.data.state){
              count = 60;
              $scope.time='60s';
              var interval = $interval(function () {
                  if(count<=0){
                      $interval.cancel(interval);
                      $scope.time='';
                  }else {
                      count--;
                      $scope.time = count+'s';
                  }

              },1000)
          }
       })
    }
}])
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
/**
 * Created by pc on 2017/4/12.
 */
'use strict';
angular.module('app').directive('appTab',[function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/tab.html',
        scope:{
            tabClick:"&",
            list:"="
        },
        link:function ($scope) {
            $scope.click = function (tab) {
                 $scope.selectId = tab.id;
                 $scope.tabClick(tab);
            }
        }
    }
}])
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

/**
 * Created by pc on 2017/4/7.
 */
'use strict';
angular.module('app').directive('appFoot',[function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/foot.html'
    }
}])
/**
 * Created by pc on 2017/4/6.
 */
'use strict';
angular.module('app').directive('appHead',['cache',function (cache) {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/head.html',
        link:function ($scope) {
            $scope.name = cache.get('name')||'';
        }
    }
}])
/**
 * Created by pc on 2017/4/7.
 */
'use strict';
angular.module('app').directive('appHeadBar',[function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/headBar.html',
        scope:{
            text:'='
        },
        link:function (scope) {
            scope.back=function () {
                window.history.back();
            }
        }
    }
}])

/**
 * Created by pc on 2017/4/12.
 */
/**
 * Created by pc on 2017/4/7.
 */
'use strict';
angular.module('app').directive('appPositionClass',[function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionClass.html',
        scope:{
            com:"="
        },
        link:function ($scope) {
            $scope.showPositionList = function (idx) {
                $scope.positionList = $scope.com.positionClass[idx].positionList;
                $scope.isActive = idx;
            }
            $scope.$watch('com',function (newVal,oldVal) {
                if(newVal){
                    $scope.showPositionList(0);
                }
            })

        }
    }
}])

/**
 * Created by pc on 2017/4/7.
 */
'use strict';
angular.module('app').directive('appPositionInfo',['$http',function ($http) {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionInfo.html',
        scope:{
          isActive:'=',
            isLogin:'=',
            pos:'='
        },
        link:function ($scope) {
            $scope.$watch('pos',function (newVal) {
                 if(newVal){
                     $scope.pos.select = $scope.pos.select||false;
                     $scope.imgPath =$scope.pos.select? 'image/star-active.png':'image/star.png';
                 }
            })
            $scope.favorite = function () {
                $http.post('data/favorite.json',{
                    id:$scope.pos.id,
                    select:$scope.pos.select
                }).success(function (resp) {
                    $scope.pos.select = !$scope.pos.select;
                    $scope.imgPath =$scope.pos.select? 'image/star-active.png':'image/star.png';
                })
            }
        }
    }
}])

/**
 * Created by pc on 2017/4/7.
 */
'use strict';
angular.module('app').directive('appPositionList',['$http',function (cache,$http) {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionList.html',
        scope:{
            data:'=',
            filterObj:'=',
            isFavorite:'='
        },
        link:function ($scope) {
           // $scope.name = cache.get('name')||'';
            $scope.select=function (item) {
                $http.post('data/favorite.json',{
                    id:item.id,
                    select:!item.select
                }).success(function (resp) {
                    item.select = !item.select;
                })

            }
        }
    }
}])
/**
 * Created by pc on 2017/4/12.
 */
'use strict';
angular.module('app').directive('appSheet',[function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/sheet.html',
        scope:{
            list:"=",
            visible:"=",
            select:"&"
        }
    }
}])
/**
 * Created by pc on 2017/4/13.
 */
'use strict';
angular.module('app').filter('filterByObj',[function () {
     return function (list,obj) {
         var result = [];
         angular.forEach(list,function (item) {
             var isEqual = true;
             for (var e in obj){
                 if(item[e]!==obj[e]){
                     isEqual = false;
                 }
             }
             if(isEqual){
                 result.push(item);
             }
         });
         return result;
     }
}])
/**
 * Created by pc on 2017/4/12.
 */
'use strict';
angular.module('app').service('cache',['$cookies',function ($cookies) {
     this.put = function (key,value) {
         $cookies.put(key,value);
     };
     this.get = function (key) {
         return $cookies.get(key);
     };
     this.remove = function (key) {
         $cookies.remove(key);
     }
}])