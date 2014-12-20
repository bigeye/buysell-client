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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/test', {
        templateUrl: 'views/newpost.html',
        controller: 'MainCtrl'
      })      .otherwise({
        redirectTo: '/'
      });
  })
    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }])
    .controller('AppCtrl', function ($scope,
                                     USER_ROLES,
                                     AuthService,
                                     $http,
                                     $cookieStore) {
        $scope.currentUser = $cookieStore.get("currentUser");
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;
        $scope.authToken = $cookieStore.get("authToken");
        if (!!$scope.authToken)
            $http.defaults.headers.common['Authorization'] = 'JWT ' + $scope.authToken;
        
        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
            $cookieStore.put("currentUser", user);
        };

        $scope.setAuthToken = function(token) {
            $scope.authToken = token;
            $cookieStore.put("authToken", token);
            if (!!token)
                $http.defaults.headers.common['Authorization'] = 'JWT ' + token;
        }
    });
