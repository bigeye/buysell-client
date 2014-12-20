angular.module('buysellApp')
    .controller('PostCtrl', function($scope, $http, Session,
                                     myService, $upload) {
        $scope.newItem = {
            title: '',
            content: '',
            price: 5000,
            status_type: 'available'
        };
        $scope.uploadImages = null;
        $scope.upload = function(post_id, finished) {
            // $upload.http({
            //     url: 'http://buysell.bigeye.me:9876/api/post/' + post_id + '/image/',
            //     method: 'POST',
            //     // headers: {'Authorization': 'xxx'}, // only for html5
            //     //withCredentials: true,
            //     data: {'alert': 'test.png', 'image': $scope.uploadImages},
            //     // file: $scope.uploadImages, // single file or a list of files. list is only for html5
            //     // fileName: 'image' // or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
            //         //fileFormDataName: myFile, // file formData name ('Content-Disposition'), server side request form name
            //         // could be a list of names for multiple files (html5). Default is 'file'
            //         //formDataAppender: function(formData, key, val){}  // customize how data is added to the formData. 
            //         // See #40#issuecomment-28612000 for sample code
            // }).progress(function(evt) {
            //     console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
            // }).success(function(data, status, headers, config) {
            //     // file is uploaded successfully
            //     console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
            //     finished();
            // });

            $http({method: 'POST',
                   url: 'http://buysell.bigeye.me:9876/api/post/' + post_id + '/image/',
                   data: {
                       alert: "test.png",
                       image: $scope.uploadImages
                   }})
                .success(function(data, status, headers, config) {
                    console.log('success ' + data);
                })
                .error(function(data, status, headers, config) {
                    console.log('fail ' + data);
                });
        };

        $scope.newpost = function (item) {
            $http.post('http://buysell.bigeye.me:9876/api/post/', item)
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
