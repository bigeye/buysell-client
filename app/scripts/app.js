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
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
    .controller('AppCtrl', function ($scope,
                                     USER_ROLES,
                                     AuthService,
                                     $cookieStore) {
        $scope.currentUser = $cookieStore.get("currentUser");
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;
        
        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
            $cookieStore.put("currentUser", user);
        };
    });
