"use strict";
function publicCtrl($scope,$routeParams,publicServices){

    init();

    function init() {
        publicServices.getNews().then(function (value) {
            $scope.news = value.data.articles;
        });
    }




}
angular.module('showAdv').controller('publicCtrl',['$scope','$routeParams','publicServices',publicCtrl]);