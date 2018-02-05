"use strict";

function publicServices($http) {

    this.getNews = function () {
        return $http.get('/api/dataservice/GetNews');
    };

    this.UpdateScreenIdHistory = function (id) {
        return $http.get('/api/dataservice/UpdateScreenIdHistory/'+id)
    }

}


angular.module('showAdv').service('publicServices', ['$http', publicServices]);
