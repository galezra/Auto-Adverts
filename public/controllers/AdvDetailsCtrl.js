
    "use strict";
    function advDetailsCtrl($scope,$rootScope,$location,$routeParams,advDetailsService , FileUploader) {
        $scope.uploader = new FileUploader();
        var advId = $routeParams.advId;

        advDetailsService.getSettings().then(function (value) {
            var settings = value.data[0];
            $scope.selectId = settings.ids;
            $scope.templates = settings.templates


        });

        if (advId != undefined) {
            init();
        }
        else {
            createAdv();
        }

        function init() {
            advDetailsService.editAdvert1(advId).then(function (value) {

                // First init
                $scope.msgEdit = value.data;
                $scope.msgEdit.date[0] = new Date($scope.msgEdit.date[0]);
                $scope.msgEdit.date[1] = new Date($scope.msgEdit.date[1]);
                $scope.uploader = new FileUploader({url: 'public/images/uploads'});
                $scope.uploader.addToQueue(value.data.images);
                $scope.Correctdays = Object.keys(value.data.days);
                $scope.selectDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                // Id's selection function
                $scope.toggleSelection = function toggleSelection(id) {
                    var idx = $scope.msgEdit.id.indexOf(id);

                    // is currently selected
                    if (idx > -1) {
                        $scope.msgEdit.id.splice(idx, 1);
                    }

                    // is newly selected
                    else {
                        $scope.msgEdit.id.push(id);
                    }


                };
                // Day's selection function
                $scope.toggleSelectionDays = function toggleSelectionDays(day) {
                    var idx = Object.keys($scope.msgEdit.days).indexOf(day);

                    // is currently selected
                    if (idx > -1) {
                       delete $scope.msgEdit.days[day]
                    }

                    // is newly selected
                    // else {
                    //     $scope.msgEdit["days"].push(day);
                    // }


                };

                $scope.removeProp = function(e){
                    if(!eval('$scope.'+e)){
                        eval('delete $scope.'+e);
                    }
                }
            });
        }

        function createAdv() {
            $scope.newAdv = {};

            $scope.uploader = new FileUploader({url: 'public/images/uploads'});
            $scope.selectDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            $scope.toggleSelection = function toggleSelection(id) {
                if ($scope.newAdv.id == undefined) {
                    $scope.newAdv.id = [];
                }
                var idx = $scope.newAdv.id.indexOf(id);

                // is currently selected
                if (idx > -1) {
                    $scope.newAdv.id.splice(idx, 1);
                }

                // is newly selected
                else {
                    $scope.newAdv.id.push(id);
                }


            }

        }

        $scope.create = function (newAdv) {
            setImages(newAdv);
            advDetailsService.createAdvert(newAdv).then(function (value) {
                $location.path('/advDetails');
            })
        };

        $scope.save = function (advForm) {
            setImages(advForm);
            $scope.newSave = {};
            $scope.newSave = angular.copy(advForm);
            advDetailsService.updateAdvert($scope.newSave).then(function (value) {
                $location.path('/advDetails');
            })

        };

        $scope.cancel = function () {
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, go back!'
            }).then(function (result) {
                if (result.value) {
                    $location.path('/advDetails');
                    $scope.$apply()
                }

            });

        };

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
                if (result.value) {
                    swal(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                    advDetailsService.deleteAdvert(_id).then(function () {
                        $location.path('/');
                        $scope.$apply();

                    });
                }

            });
        };

        $scope.getNumber = function (num) {
            return new Array(num);
        };

        function setImages(advForm) {
            advForm.images = [];
            for (var i = 0; i < $scope.uploader.queue.length; i++) {
                advForm.images.push("images/uploads/" + $scope.uploader.queue[i].file.name)
            }

        }



    }
    angular.module('manageAdv').controller('advDetailsCtrl',[ '$scope','$rootScope','$location','$routeParams','advDetailsService','FileUploader',advDetailsCtrl]);



