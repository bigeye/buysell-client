'use strict';

/**
 * @ngdoc function
 * @name buysellApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the buysellApp
 */
angular.module('buysellApp')
    .controller('MainCtrl', function ($scope, ngDialog, myService, $http, API_URL, $rootScope) {
        $scope.cardSelected = function($photo) {
            $scope.selectedCard = $photo;
            $http.get(API_URL + '/api/post/' + $photo.id + '/transactions/')
                .success(function(data, status, headers, config) {
                    console.log('success');
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    console.log('fail');
                    console.log(data);
                    myService.alertResponse(data);
                });
            
            myService.clickToOpen('views/postdetail.html', $scope, 'postdetail');
        };

        $scope.posts = [
            {id: 1, title: 'Awesome photo', content: 'Hello', writer: {name:'Samantha', profile: 'http://api.randomuser.me/portraits/med/women/60.jpg'}, images: [// 'http://lorempixel.com/400/300/sports'
                ], price: 1000},
                    ];
        myService.loadPosts(function(posts) {
            $rootScope.posts = posts;
        });
    })
    .directive('imageloaded', [
        function () {
            return {
                restrict: 'A',

                link: function(scope, element, attrs) {   
                    var cssClass = attrs.loadedclass;

                    element.bind('load', function (e) {
                        angular.element(element).addClass(cssClass);
                    });
                }
            };
        }
    ]);
