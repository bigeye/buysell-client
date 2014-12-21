'use strict';

/**
 * @ngdoc function
 * @name buysellApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the buysellApp
 */
angular.module('buysellApp')
    .controller('MainCtrl', function ($scope, ngDialog, myService, $http, API_URL, $rootScope, AuthService) {
        $scope.cardSelected = function($photo) {
            $scope.selectedCard = $photo;
            $scope.txid = 0;
            $scope.txstatus = 'ask';

            if (!!AuthService.isAuthenticated()) {
                $http.get(API_URL + '/api/post/' + $photo.id + '/transaction/')
                    .success(function(data, status, headers, config) {
                        console.log('success');
                        console.log(data);
                        if (Object.keys(data).length > 0) {
                            $scope.txid = data.id;
                            $scope.txstatus = data.status;
                        }
                        // else {
                        //     $http.post(API_URL + '/api/post/' + $photo.id + '/transaction/')
                        //         .success(function(res) {
                        //             console.log(res);
                        //             $scope.txid = res.id;
                        //             $scope.txstatus = res.status;
                        //         });
                        // }
                    })
                    .error(function(data, status, headers, config) {
                        console.log('fail');
                        console.log(data);
                        myService.alertResponse(data);
                    });
            }            
            myService.clickToOpen('views/postdetail.html', $scope, 'postdetail');
        };

        $scope.sendTx = function(newStatus) {
            if (confirm('Are you sure you want to ' + newStatus + '?')) {
                $http.put(API_URL + '/api/post/' + $scope.selectedCard.id + '/transaction/', {'status': newStatus})
                    .success(function(res) {
                        $scope.txstatus = res.status;
                    });
            }
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
