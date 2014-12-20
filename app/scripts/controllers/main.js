'use strict';

/**
 * @ngdoc function
 * @name buysellApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the buysellApp
 */
angular.module('buysellApp')
    .controller('MainCtrl', ['$scope', 'ngDialog', function ($scope, ngDialog) {
        $scope.clickToOpen = function () {
            ngDialog.open({ template: 'views/postdetail.html',
                            scope: $scope });
        };

        $scope.cardSelected = function($photo) {
            $scope.selectedCard = $photo;
            $scope.clickToOpen();
        };

        $scope.photos = [
            {id: 'photo-1', name: 'Awesome photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/95.jpg', src: 'http://lorempixel.com/400/300/abstract', price: 1000},
            {id: 'photo-2', name: 'Great photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/90.jpg', src: 'http://lorempixel.com/450/400/city', price: 1000},
            {id: 'photo-3', name: 'Strange photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/11.jpg', src: 'http://lorempixel.com/400/300/people', price: 1000},
            {id: 'photo-4', name: 'A photo?', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/12.jpg', src: 'http://lorempixel.com/400/300/transport', price: 1000},
            {id: 'photo-5', name: 'What a photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/15.jpg', src: 'http://lorempixel.com/450/300/fashion', price: 1000},
            {id: 'photo-6', name: 'Silly photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/18.jpg', src: 'http://lorempixel.com/400/300/technics', price: 1000},
            {id: 'photo-7', name: 'Weird photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/33.jpg', src: 'http://lorempixel.com/410/350/sports', price: 1000},
            {id: 'photo-8', name: 'Modern photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/87.jpg', src: 'http://lorempixel.com/400/300/nightlife', price: 1000},
            {id: 'photo-9', name: 'Classical photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/54.jpg', src: 'http://lorempixel.com/400/300/nature', price: 1000},
            {id: 'photo-10', name: 'Dynamic photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/1.jpg', src: 'http://lorempixel.com/420/300/abstract', price: 1000},
            {id: 'photo-11', name: 'Neat photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/74.jpg', src: 'http://lorempixel.com/400/300/sports', price: 1000},
            {id: 'photo-12', name: 'Bumpy photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/69.jpg', src: 'http://lorempixel.com/400/300/nightlife', price: 1000},
            {id: 'photo-13', name: 'Brilliant photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/10.jpg', src: 'http://lorempixel.com/400/380/nature', price: 1000},
            {id: 'photo-14', name: 'Excellent photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/50.jpg', src: 'http://lorempixel.com/480/300/technics', price: 1000},
            {id: 'photo-15', name: 'Gorgeous photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/60.jpg', src: 'http://lorempixel.com/400/300/sports', price: 1000},
            {id: 'photo-16', name: 'Lovely photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/40.jpg', src: 'http://lorempixel.com/400/300/nightlife', price: 1000},
            {id: 'photo-17', name: 'A "wow" photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/4.jpg', src: 'http://lorempixel.com/400/300/nature', price: 1000},
            {id: 'photo-18', name: 'Bodacious photo', writer: 'Samantha', writer_img: 'http://api.randomuser.me/portraits/med/women/2.jpg', src: 'http://lorempixel.com/400/300/abstract', price: 1000}
      ];
  }])
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
