angular.module('buysellApp')
    .controller('InboxCtrl', function($scope, $http, myService,
                                      API_URL, $location) {
        $scope.inboxes = [];
        $http.get(API_URL + '/api/account/transaction/')
            .success(function(res) {
                console.log(res.results);
                $scope.inboxes = res.results;
            })
            .error(function(res) {
                console.log(res);
                alert("Empty inbox");
                $location.path('/');
            });
    });
