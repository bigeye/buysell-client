'use strict';

/**
 * @ngdoc function
 * @name buysellApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the buysellApp
 */
angular.module('buysellApp')
    .controller('MainCtrl', ['$scope', 'ngDialog', 'myService', function ($scope, ngDialog, myService) {
        $scope.cardSelected = function($photo) {
            $scope.selectedCard = $photo;
            myService.clickToOpen('views/postdetail.html', $scope, 'postdetail');
        };

        $scope.photos = [
            {id: 'photo-1', name: 'Awesome photo', writer: 'Samantha', writer_img: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/c0.3.160.160/p160x160/38898_104978036222229_5309733_n.jpg?oh=00ed98964a5680eb107456a5b0b8dfb8&oe=55067EB3&__gda__=1426390243_60d98324f66bf131ef1773a6d5ef6903', src: 'http://static6.businessinsider.com/image/511ba0dd69beddd00200001d/even-with-a-price-cut-you-should-skip-the-13-inch-retina-macbook-pro.jpg', price: 1000},
            {id: 'photo-2', name: 'Great photo', writer: 'Samantha', writer_img: 'https://randomuser.me/api/portraits/med/women/56.jpg', src: 'http://ecx.images-amazon.com/images/I/51WzxSHzdvL.jpg', price: 1000},
            {id: 'photo-3', name: 'Strange photo', writer: 'Samantha', writer_img: 'https://randomuser.me/api/portraits/med/men/62.jpg', src: 'http://best-video-phone.info/wp-content/uploads/2014/09/iphone-4-black-in-handiphone-4s-second-hand-for-sale---used-philippines-pzcrz3hi.jpg', price: 1000},
            {id: 'photo-4', name: 'A photo?', writer: 'Samantha', writer_img: 'https://randomuser.me/api/portraits/med/men/32.jpg', src: 'http://cdn.shocho.co/sc-image/4/b/0/2/4b02b5e4226665936bd2e060e50de635.jpg', price: 1000},
            {id: 'photo-5', name: 'What a photo', writer: 'Samantha', writer_img: 'https://randomuser.me/api/portraits/med/men/97.jpg', src: 'http://www.directbadminton.co.uk/Images/ExtraLarge/ashaway_nano_dynamic_80_badminton_racket_silv.jpg', price: 1000},
            {id: 'photo-6', name: 'Silly photo', writer: 'Samantha', writer_img: 'https://randomuser.me/api/portraits/med/men/30.jpg', src: 'http://upload.wikimedia.org/wikipedia/commons/9/91/Toshiba_1_TB_External_USB_Hard_Drive.jpg', price: 1000},
            {id: 'photo-7', name: 'Weird photo', writer: 'Samantha', writer_img: 'https://randomuser.me/api/portraits/med/men/22.jpg', src: 'http://2.bp.blogspot.com/-xFiAtobWD14/VCbNZmtCCcI/AAAAAAAAN-M/1H8Tf5Nq4uk/s1600/logitech_classic_keyboard_200.jpg', price: 1000},
            {id: 'photo-8', name: 'Modern photo', writer: 'Samantha', writer_img: 'https://randomuser.me/api/portraits/med/women/51.jpg', src: 'http://web.tradekorea.com/upload_file2/product/063/P00266063/cbe9caa5_0bb8d7e7_9d8f_4cb2_a796_acdd8fcbbee8.jpg', price: 1000},
            {id: 'photo-9', name: 'Classical photo', writer: 'Samantha', writer_img: 'https://randomuser.me/api/portraits/med/men/83.jpg', src: 'http://www.shopbmwusa.com/Assets/images/Detail4X/CheckerBoardWallet_01%20copy_1868.jpg', price: 1000},
            {id: 'photo-10', name: 'Dynamic photo', writer: 'Samantha', writer_img: 'https://randomuser.me/api/portraits/med/women/3.jpg', src: 'http://ecx.images-amazon.com/images/I/81F5JGBBhWL._SL1500_.jpg', price: 1000},
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
