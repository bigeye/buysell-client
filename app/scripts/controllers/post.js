angular.module('buysellApp')
    .controller('PostCtrl', function($scope, $http, Session,
                                     myService, $upload, API_URL) {
        $scope.newItem = {
            title: '',
            content: '',
            price: 5000,
            status_type: 'available'
        };
        $scope.uploadImages = null;
        $scope.upload = function(post_id, finished) {
            if (!$scope.uploadImages) {
                finished();
                return;
            }
            var fd = new FormData();

            fd.append('alert', 'test.jpg');
            fd.append('image', $scope.uploadImages);
            $http.post(API_URL + '/api/post/' + post_id + '/image/',
                       fd,
                       {
                           transformRequest: angular.identity,
                           headers: {'Content-Type': undefined}
                       })
                .success(function(data, status, headers, config) {
                    console.log('success ' + data);
                    finished();
                })
                .error(function(data, status, headers, config) {
                    console.log('fail ' + data);
                    myService.alertResponse(data);
                });
        };

        $scope.newpost = function (item) {
            $http.post(API_URL + '/api/post/', item)
                .then(function (res) {
                    console.log(res['data']);
                    $scope.upload(res.data.id, function() {
                        $scope.closeThisDialog();
                    });
                }, function(error) {
                    myService.alertResponse(error['data']);
                });
        }
    });
