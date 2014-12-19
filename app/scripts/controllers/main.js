'use strict';

/**
 * @ngdoc function
 * @name buysellApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the buysellApp
 */
angular.module('buysellApp')
    .controller('MainCtrl', function ($scope) {
        $scope.photos = [
            {id: 'photo-1', name: 'Awesome photo', src: 'http://lorempixel.com/400/300/abstract', price: 1000},
            {id: 'photo-2', name: 'Great photo', src: 'http://lorempixel.com/450/400/city', price: 1000},
            {id: 'photo-3', name: 'Strange photo', src: 'http://lorempixel.com/400/300/people', price: 1000},
            {id: 'photo-4', name: 'A photo?', src: 'http://lorempixel.com/400/300/transport', price: 1000},
            {id: 'photo-5', name: 'What a photo', src: 'http://lorempixel.com/450/300/fashion', price: 1000},
            {id: 'photo-6', name: 'Silly photo', src: 'http://lorempixel.com/400/300/technics', price: 1000},
            {id: 'photo-7', name: 'Weird photo', src: 'http://lorempixel.com/410/350/sports', price: 1000},
            {id: 'photo-8', name: 'Modern photo', src: 'http://lorempixel.com/400/300/nightlife', price: 1000},
            {id: 'photo-9', name: 'Classical photo', src: 'http://lorempixel.com/400/300/nature', price: 1000},
            {id: 'photo-10', name: 'Dynamic photo', src: 'http://lorempixel.com/420/300/abstract', price: 1000},
            {id: 'photo-11', name: 'Neat photo', src: 'http://lorempixel.com/400/300/sports', price: 1000},
            {id: 'photo-12', name: 'Bumpy photo', src: 'http://lorempixel.com/400/300/nightlife', price: 1000},
            {id: 'photo-13', name: 'Brilliant photo', src: 'http://lorempixel.com/400/380/nature', price: 1000},
            {id: 'photo-14', name: 'Excellent photo', src: 'http://lorempixel.com/480/300/technics', price: 1000},
            {id: 'photo-15', name: 'Gorgeous photo', src: 'http://lorempixel.com/400/300/sports', price: 1000},
            {id: 'photo-16', name: 'Lovely photo', src: 'http://lorempixel.com/400/300/nightlife', price: 1000},
            {id: 'photo-17', name: 'A "wow" photo', src: 'http://lorempixel.com/400/300/nature', price: 1000},
            {id: 'photo-18', name: 'Bodacious photo', src: 'http://lorempixel.com/400/300/abstract', price: 1000}
      ];
  })
    .directive('imageloaded', [

        function () {

            'use strict';

            return {
                restrict: 'A',

                link: function(scope, element, attrs) {   
                    var cssClass = attrs.loadedclass;

                    element.bind('load', function (e) {
                        angular.element(element).addClass(cssClass);
                    });
                }
            }
        }
    ]);
