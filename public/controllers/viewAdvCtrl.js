
"use strict";
function viewAdvCtrl($scope,$rootScope,$location,advDetailsService ) {
$scope.count = 1;
    advDetailsService.getAllAdvert().then(function (value) {
            $scope.msgs = value.data;
            $scope.msgEdit = {};

        });

    $scope.delete = function (_id) {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if(result.value)
            {
                swal(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
                advDetailsService.deleteAdvert(_id).then(function () {
                    $location.path('/manager');
                    $scope.$apply();

                });
            }

        });
    };

}
angular.module('manageAdv').controller('viewAdvCtrl',[ '$scope','$rootScope','$location','advDetailsService',viewAdvCtrl]);



