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
    .factory('AuthService', function ($http, Session, API_URL) {
        var authService = {};
        
        authService.login = function (credentials, $scope) {
            $http
                .post(API_URL + '/api/account/auth_token/', credentials)
                .then(function (res) {
                    $scope.setAuthToken(res.data.token);
                });
            return $http
                .post(API_URL + '/api/account/login/', credentials)
                .then(function (res) {
                    Session.create(res.data.id, res.data.id);
                    return res.data;
                });
        };

        authService.signup = function (credentials, $scope) {
            return $http
                .post(API_URL + '/api/account/user/', credentials)
                .then(function (res) {
                    Session.create(res.data.id, res.data.id);
                    $http.post(API_URL + '/api/account/auth_token/', credentials)
                        .then(function (res) {
                            $scope.setAuthToken(res.data.token);
                        });
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

        $scope.signupCredentials = {
            username: '',
            password: '',
            passwordConfirm: '',
            email: '',
            first_name: '',
            last_name: '',
        };

        $scope.signin = function(credentials) {
            AuthService.login(credentials, $scope).then(function (user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $scope.setCurrentUser(user);
                $scope.closeThisDialog();
            }, function (error) {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                myService.alertResponse(error["data"]);
            })
        }

        $scope.signup = function(credentials) {
            if (credentials.password != credentials.passwordConfirm) {
                myService.alertResponse({'password': ['It doesn\'t match with password confirm.']});
                return;
            }
            AuthService.signup(credentials, $scope).then(function (user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $scope.setCurrentUser(user);
                $scope.closeThisDialog();
            }, function (error) {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                myService.alertResponse(error['data']);
            })
        }
    });


