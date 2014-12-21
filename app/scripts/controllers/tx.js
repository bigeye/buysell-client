angular.module('buysellApp')
    .controller('TxCtrl', function($scope, $http, myService, API_URL,
                                   $routeParams, $route, $location) {
        $scope.txid = $routeParams.id;
        $scope.tx = null;
        $scope.txs = [];
        $scope.message = '';

        $http.get(API_URL + '/api/transaction/' + $scope.txid + '/message/list/')
            .success(function(res) {
                console.log(res.results);
                $scope.txs = res.results;
            })
            .error(function(res) {
                console.log(res);
                alert("Transaction doesn't exist");
                $location.path('/');
            });
        $scope.sendMessage = function() {
            $http.post(API_URL + '/api/transaction/' + $scope.txid + '/message/', {content: $scope.message})
                .success(function(res) {
                    console.log(res);
                    $http.put(API_URL + '/api/account/notification/');
                    $route.reload();
                })
                .error(function(res) {
                    console.log(res);
                });
        };
            
    });
                
