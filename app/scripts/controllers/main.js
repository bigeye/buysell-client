'use strict';

/**
 * @ngdoc function
 * @name buysellApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the buysellApp
 */
angular.module('buysellApp')
    .controller('MainCtrl', function ($scope, ngDialog, myService, $http) {
        $scope.cardSelected = function($photo) {
            $scope.selectedCard = $photo;
            myService.clickToOpen('views/postdetail.html', $scope, 'postdetail');
        };

        $http.get('http://buysell.bigeye.me:9876/api/post/list/')
            .success(function (res) {
                console.log(res);
                $scope.photos = res.results;
                $scope.photos.forEach(function(post, i) {
                    if (post.images.length == 0)
                        post.images[0] = 'http://portal.aolcdn.com/p5/forms/4344/2af553bd-0f81-41d1-a061-8858924b83ca.jpg';
                    else {
                        post.images.forEach(function(image, i) {
                            console.log(image);
                            post.images[i] = 'http://buysell.bigeye.me:9876' + image.url;
                        });
                    }
                });
            })
            .error(function(error) {
                console.log(error);
                // myService.alertResponse(error['data']);
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
