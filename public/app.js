
    "use strict";
var manageAdv = angular.module('manageAdv', ['ngRoute','angularFileUpload']);
    manageAdv.config(function($routeProvider,$locationProvider) {
    $routeProvider
        .when("/",{
            templateUrl : "views/manager/advMain.html",
            controller : "manageCtrl"

        })
        .when("/advDetails",{
            templateUrl : "views/manager/advDetails.html",
             controller : "viewAdvCtrl"
        })
        .when("/advCreate",{
            templateUrl : "views/manager/advCreate.html",
            controller : "advDetailsCtrl"
        })

        .when("/advEdit/:advId",{
            templateUrl : "views/manager/advEdit.html",
            controller : "advDetailsCtrl"
        })
        .when("/customAdverts",{
            templateUrl : "views/manager/customAdverts.html",
        })
        .when("/advSettings",{
            templateUrl : "views/manager/advSettings.html",
            controller : "advSettingsCtrl"
        })



    // $locationProvider.html5Mode(true); TODO: for the # in the url
});

    var showAdv = angular.module('showAdv', ['ngRoute']);
    showAdv.config(function ($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl : "views/index/index.html",
            })
            .when("/screen=:id",{
                templateUrl: "views/index/screens.html",
                 controller : "screensCtrl"

            })


    });
