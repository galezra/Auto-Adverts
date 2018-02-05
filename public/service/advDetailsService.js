"use strict";
    function advDetailsService($http) {

        this.getAllAdvert = function () {
          return $http.get('/api/dataservice/GetAllAdverts');
         };

        this.createAdvert = function (newAdvert) {
            return $http.post('/api/dataservice/CreateAdvert', newAdvert);

        };

         this.editAdvert1 = function (_id) {
            return $http.get('/api/dataservice/EditAdvert/'+_id)

         };

        this.updateAdvert = function (editAdvert) {
            return $http.put('/api/dataservice/UpdateAdvert', editAdvert);

        };

        this.deleteAdvert = function (_id) {
            return $http.delete('/api/dataservice/DeleteAdverts/'+_id)
        };

        this.getSettings = function () {
            return $http.get('/api/dataservice/GetSettings');
        };

        this.updateAdvSettings = function (newSettings) {
            return $http.post('/api/dataservice/updateAdvSettings/',newSettings);
        };

        this.getSearchScreen = function (id) {
            return $http.get('/api/dataservice/GetSearchId/'+id);

        }
    }




     angular.module('manageAdv').service('advDetailsService',['$http',advDetailsService]);
