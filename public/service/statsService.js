"use strict";

function statsServices($http) {

    this.getGroupByTemplate = function () {
        return $http.get('/api/dataservice/GetGroupByTemplate');
    };

    this.getAvgByShowtime = function () {
        return $http.get('/api/dataservice/GetAvgByShowtime');
    };

    this.getLocation = function () {
        return $http.get('/api/dataservice/GetLocation');
    }

    this.getViewsHistory = function () {
        return  $http.get('/api/dataservice/GetScreenIdHistory');
    }
}



angular.module('manageAdv').service('statsServices', ['$http', statsServices]);
