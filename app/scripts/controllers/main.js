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
            myService.clickToOpen('views/postdetail.html', $scope, 'postdetail');
        };
        // $scope.cccc = function() {
        //     $scope.posts.push(
        //                 {id: 1, title: 'Awesome photo', content: 'Hello', writer: {name:'Samantha', profile: 'http://api.randomuser.me/portraits/med/women/60.jpg'}, images: [// 'http://lorempixel.com/400/300/sports'
        //                                                                                                                                                          ], price: 1000});
        // }

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
