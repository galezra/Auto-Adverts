
"use strict";
function screensCtrl($scope,$routeParams,publicServices) {
    var id = $routeParams.id;
    start(id);
    publicServices.UpdateScreenIdHistory(id);


}


angular.module('showAdv').controller('screensCtrl',['$scope','$routeParams','publicServices',screensCtrl]);