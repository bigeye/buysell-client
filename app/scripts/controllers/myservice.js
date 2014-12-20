angular.module('buysellApp')
    .factory('myService', ['ngDialog', function(ngDialog) {
        return {
            clickToOpen: function (template, scope, tag) {
                ngDialog.open({ template: template,
                                className: 'ngdialog-theme-default ' + tag,
                                scope: scope });
            }
        }
    }]);
