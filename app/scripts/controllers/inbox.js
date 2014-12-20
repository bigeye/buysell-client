angular.module('buysellApp')
    .controller('InboxCtrl', function($scope, $http, myService, API_URL) {
        $http.get(API_URL + '/api/account/transaction')
            .success(function(res) {
                console.log(res.data);
            })
            .error(function(res) {
                console.log(res.data);
            });
    });
