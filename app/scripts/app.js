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
  });
