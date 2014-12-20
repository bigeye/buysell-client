angular.module('buysellApp')
    .factory('myService', ['ngDialog', function(ngDialog) {
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
            }
        }
    }]);
