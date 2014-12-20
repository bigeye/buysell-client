angular.module('buysellApp')
    .constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        guest: 'guest'
    })
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .factory('AuthService', function ($http, Session) {
        var authService = {};
        
        authService.login = function (credentials) {
            return $http
                .post('http://143.248.234.137:9876/api/account/login', credentials)
                .then(function (res) {
                    Session.create(res.data.id, res.data.id);
                    return res.data;
                });
        };
        
        authService.isAuthenticated = function () {
            return !!Session.userId;
        };
        
        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
                    authorizedRoles.indexOf(Session.userRole) !== -1);
        };
        
        return authService;
    })
    .service('Session', function () {
        this.create = function (sessionId, userId) {
            this.id = sessionId;
            this.userId = userId;
            // this.userRole = userRole;
        };
        this.destroy = function () {
            this.id = null;
            this.userId = null;
            // this.userRole = null;
        };
        return this;
    })
    .controller('LoginCtrl', function ($scope, $rootScope, myService, AUTH_EVENTS, AuthService) {
        $scope.credentials = {
            username: '',
            password: ''
        };
        $scope.signin = function(credentials) {
            AuthService.login(credentials).then(function (user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $scope.setCurrentUser(user);
                $scope.closeThisDialog();
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                alert("Login failed");
            })
        }
    });


