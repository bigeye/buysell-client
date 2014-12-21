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
                if ($scope.txs.length > 0)
                    $scope.tx = $scope.txs[0].transaction;
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

        $scope.txaccept = function() {
            $scope.sendTx("Are you sure to ACCEPT this request?\nThis action CANNOT be undone!", "accept");
            };
        $scope.txcancel = function() {
            $scope.sendTx("Are you sure to DENY this request?\nThis action CANNOT be undone!", "deny");
            };
        $scope.sendTx = function(message, newStatus) {
            if (confirm(message)) {
                $http.put(API_URL + '/api/post/' + $scope.tx.post.id + '/transaction/', {'status': newStatus})
                    .success(function(res) {
                        $scope.tx = res;
                        $location.reload();
                    });
            }
        };
            
    });
                
