
    "use strict";
    function advDetailsCtrl($scope,$rootScope,$location,advDetailsService) {

        if($location.path() == "/advDetails"){
        advDetailsService.getAllAdvert().then(function (value) {
            $scope.msgs = value.data;

        });
        }

        $scope.edit = function (_id) {

            advDetailsService.editAdvert(_id).then(function (value) {
                $rootScope.msgEdit = value.data;
                $location.path('/advEdit');

                $rootScope.Correctdays = Object.keys(value.data.days);
                console.log($rootScope.Correctdays)

            });
        };

        $scope.delete = function (_id) {
            if (confirm('Are you sure you want delete?')) {
                advDetailsService.deleteAdvert(_id).then(function () {
                    $location.path('/advDetails');
                });
            }
        };

        $rootScope.selectDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $rootScope.selectId = [1,2,3,4,5];


    }



    angular.module('myApp').controller('advDetailsCtrl',[ '$scope','$rootScope','$location','advDetailsService',advDetailsCtrl]);



