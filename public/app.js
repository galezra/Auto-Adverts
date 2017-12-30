
    "use strict";
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider,$locationProvider) {
    $routeProvider
        .when("/advDetails",{
            templateUrl : "views/manager/advDetails.html",
             controller : "advDetailsCtrl"
        })
        .when("/advEdit",{
            templateUrl : "views/manager/advEdit.html",
            controller : "advDetailsCtrl"
        })

    // $locationProvider.html5Mode(true); TODO: for the # in the url
});
