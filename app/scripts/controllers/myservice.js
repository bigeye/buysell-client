angular.module('buysellApp')
    .factory('myService', function(ngDialog, $http, API_URL) {
        return {
            clickToOpen: function (template, scope, tag) {
                ngDialog.open({ template: template,
                                className: 'ngdialog-theme-default ' + tag,
                                scope: scope });
            },
            alertResponse: function (data) {
                var errorMsg = "";
                for (var key in data) {
                    if (data[key].length >= 1) {
                        errorMsg += key + ": " + data[key][0] + "\n";
                    }
                }
                alert(errorMsg);
            },
            loadPosts: function (finished) {
                $http.get(API_URL + '/api/post/list/')
                    .success(function (res) {
                        var posts = res.results;
                        posts.forEach(function(post, i) {
                            if (post.images.length == 0)
                                post.images[0] = 'http://portal.aolcdn.com/p5/forms/4344/2af553bd-0f81-41d1-a061-8858924b83ca.jpg';
                            else {
                                post.images.forEach(function(image, i) {
                                    post.images[i] = API_URL + image.url;
                                });
                            }
                        });
                        finished(posts);
                    })
                    .error(function(error) {
                        console.log(error);
                    });
                },
            }
        });

