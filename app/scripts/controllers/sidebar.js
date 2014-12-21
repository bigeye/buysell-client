angular.module('buysellApp')
    .controller('SidebarCtrl', function ($scope, ngDialog, myService,
                                         Session, $location, $http, API_URL) {
        $scope.noticnt = 0;
        $scope.credentials = {
            username: '',
            password: ''
        };        

        $scope.newPost = function() {
            myService.clickToOpen('views/newpost.html', $scope, 'newpost');
        }

        $scope.openSignin = function() {
            myService.clickToOpen('views/signin.html', $scope, 'signin');
        }

        $scope.openSignup = function() {
            myService.clickToOpen('views/signup.html', $scope, 'signup');
        }

        $scope.signout = function() {
            $scope.setCurrentUser(null);
            $scope.setAuthToken('');
            Session.destroy();
            $location.path('/');
        }
        $scope.$on('$routeChangeStart', function(next, current) {
            if (current.controller == 'InboxCtrl' || current.controller == 'TxCtrl') {
                $scope.noticnt = 0;
                $http.put(API_URL + '/api/account/notification/');
            } else {
                $http.get(API_URL + '/api/account/notification/')
                    .success(function(res) {
                        $scope.noticnt = res.count;
                    });
            }
        });
    });
