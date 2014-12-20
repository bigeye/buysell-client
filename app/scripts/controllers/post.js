angular.module('buysellApp')
    .controller('PostCtrl', function($scope, $http, Session, myService) {
        $scope.newItem = {
            title: '',
            content: '',
            price: 0,
            image: null,
            status_type: 'available'
        };

        $scope.newpost = function (item) {
            $http.post('http://buysell.bigeye.me:9876/api/post/', item)
                .then(function (res) {
                    console.log(res['data']);
                    $scope.closeThisDialog();
                }, function(error) {
                    myService.alertResponse(error['data']);
                });            
        }
    });
