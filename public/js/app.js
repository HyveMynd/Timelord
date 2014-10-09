$.backstretch([
    "images/moon.png",
    "images/earth.png",
    "images/galaxy.png",
    "images/shuttle.png",
    "images/moon_walk.png"
], {fade: "slow"});

var app = angular.module('gallifrey', ['ngResource', 'ngRoute', 'mgcrea.ngStrap']);

var authResolve = ['$q', 'AuthService', function ($q, AuthService) {
   var isAuth = AuthService.isAuthenticated();

    if (isAuth){
        return $q.when();
    } else {
        return $q.reject({auth: false});
    }
}];

var homeRedirect = ['$q', 'AuthService', function ($q, AuthService) {
    var isAuth = AuthService.isAuthenticated();
    if (!isAuth){
        return $q.when();
    } else {
        return $q.reject({auth: true});
    }
}];

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
        when('/', {
            templateUrl: 'partials/home',
            controller: 'LoginCtrl',
//            resolve: {home: homeRedirect}
        }).
        when('/about', {
            templateUrl: 'partials/about'
        }).
        when('/login', {
            templateUrl: 'partials/login',
            controller: 'LoginCtrl'
        }).
        when('/register', {
            templateUrl: 'partials/register',
            controller: 'RegistrationCtrl'
        }).
        when('/profile', {
            templateUrl: 'partials/profile',
            controller: 'ProfileCtrl',
//            resolve: { auth: authResolve }
        }).
        when('/hours', {
            templateUrl: 'partials/hours',
//            resolve: {auth: authResolve}
        }).
        when('/payroll', {
            templateUrl: 'partials/payroll',
            controller: 'PayrollCtrl',
//            resolve: {auth: authResolve}
        }).
        when('/projects', {
            templateUrl: 'partials/projects',
//            resolve: {auth: authResolve}
        }).
        otherwise({
            redirectTo: '/'
        });
}]);

app.run(['$rootScope', '$location', function ($rootScope, $location) {

    // Check for authentication failed and reroute to login
    $rootScope.$on('$routeChangeError', function (event, current, previous, eventObj) {
        if (eventObj.auth === false){
            $location.path('/login');
        } else if (eventObj.auth === true){
            $location.path('/hours');
        }
    })
}]);