angular.module('buysellApp')
    .controller('InboxCtrl', function($scope, $http, myService) {
        $http.get('http://buysell.bigeye.me:9876/api/account/transaction')
            .success(function(res) {
                console.log(res.data);
            })
            .error(function(res) {
                console.log(res.data);
            });
    });
