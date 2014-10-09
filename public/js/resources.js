/**
 * Created by Andres Monroy (HyveMynd) on 9/22/14.
 */


var app = angular.module('gallifrey');

app.value('Toastr', toastr);

app.service('ToasterService', ['Toastr', function (Toastr) {
    var toastrOptions = {
        "closeButton": false,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "slideDown",
        "hideMethod": "slideUp"
    };

    return {
        notify: function (msg) {
            Toastr.options = toastrOptions;
            Toastr.success(msg);
        },
        error: function (msg) {
            Toastr.error(msg);
        }
    }
}]);

app.factory('AuthService',
    ['$http', 'ToasterService', '$q', 'Session', function ($http, ToasterService, $q, Session) {

        function login(user){
            var defer = $q.defer();
            $http.post('/auth/login', user).
                success(function (data) {
                    ToasterService.notify('Welcome ' + data.firstName + " " + data.lastName + "!");
                    Session.create(data);
                    defer.resolve(data);
                }).
                error(function (data) {
                    ToasterService.error(data.message);
                    defer.reject(data.message);
                });
            return defer.promise;
        }

        function logout() {
            var defer = $q.defer();
            $http.post('auth/logout').
                success(function () {
                    ToasterService.notify("Logged Out");
                    Session.destroy();
                    defer.resolve();
                }).
                error(function (data) {
                    ToasterService.error(data);
                    defer.reject(data);
                });
            return defer.promise;
        }

        function register(user) {
            var defer = $q.defer();
            $http.post('/auth/register', user).
                success(function (data) {
                    ToasterService.notify('Welcome ' + data.firstName + " " + data.lastName + "!");
                    Session.create(data);
                    defer.resolve(data);
                }).
                error(function (data) {
                    ToasterService.error(data.message);
                    defer.reject();
                });
            return defer.promise;
        }

        function isAuthenticated(){
            return !!Session.user;
        }

        return {
            login: login,
            logout: logout,
            register: register,
            isAuthenticated: isAuthenticated
        }
}]);

app.service('Session', ['$window', function ($window) {
    var self = this;

    self.create = function (session) {
        $window.sessionStorage['currentUser'] = JSON.stringify(session);
        self.user = session;
    };

    self.destroy = function () {
        $window.sessionStorage['currentUser'] = null;
        self.user = null;
    };

    function init() {
        if ($window.sessionStorage["currentUser"]) {
            self.user = JSON.parse($window.sessionStorage["currentUser"]);
        }
    }
    init();

    return self;
}]);

app.factory('Basket', function() {
    var items = [];
    var myBasketService = {};

    myBasketService.addItem = function(item) {
        items.push(item);
    };
    myBasketService.removeItem = function(item) {
        var index = items.indexOf(item);
        items.splice(index, 1);
    };
    myBasketService.items = function() {
        return items;
    };

    return myBasketService;
});