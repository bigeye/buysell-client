'use strict';

/**
 * @ngdoc overview
 * @name buysellApp
 * @description
 * # buysellApp
 *
 * Main module of the application.
 */
angular
  .module('buysellApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'akoenig.deckgrid',
    'ngDialog',
    'angularFileUpload',
  ])
    .constant('API_URL', 'http://buysell.bigeye.me:9876')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/inbox', {
        templateUrl: 'views/inbox.html',
        controller: 'InboxCtrl'
      })
      .when('/tx/:id', {
        templateUrl: 'views/tx.html',
        controller: 'TxCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                
                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .controller('AppCtrl', function ($scope,
                                     USER_ROLES,
                                     AuthService,
                                     $http,
                                     $cookieStore,
                                     Session) {
        $scope.currentUser = $cookieStore.get("currentUser");
        $scope.userRoles = USER_ROLES;
        $scope.authToken = $cookieStore.get('authToken');
        $scope.isAuthorized = AuthService.isAuthorized;
        if (!!$scope.authToken) {
            Session.create($scope.currentUser.id,
                           $scope.currentUser.id);
            $http.defaults.headers.common['Authorization'] = 'JWT ' + $scope.authToken;
        } else {
            delete $http.defaults.headers.common['Authorization'];
            Session.destroy();
        }
        
        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
            $cookieStore.put("currentUser", user);
        };

        $scope.setAuthToken = function(token) {
            $scope.authToken = token;
            $cookieStore.put("authToken", token);
            if (!!token)
                $http.defaults.headers.common['Authorization'] = 'JWT ' + token;
            else
                delete $http.defaults.headers.common['Authorization'];
        }
    });
