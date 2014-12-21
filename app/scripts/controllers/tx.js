angular.module('buysellApp')
    .controller('TxCtrl', function($scope, $http, myService, API_URL, $routeParams) {
        $scope.txid = $routeParams.id;
        $scope.txs = [];
        $http.get(API_URL + '/api/transaction/' + $scope.txid + '/message/list/')
            .success(function(res) {
                console.log(res.results);
                $scope.txs = res.results;
            })
            .error(function(res) {
                console.log(res);
            });
    });
                
