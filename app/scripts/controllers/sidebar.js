angular.module('buysellApp')
    .controller('SidebarCtrl', function ($scope, ngDialog, myService, Session) {
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
        }
    });
