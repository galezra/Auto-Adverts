"use strict";
    function advDetailsService($http) {
        this.getAllAdvert = function () {
          return $http.get('/api/dataservice/GetAllAdverts');
         };

         this.deleteAdvert = function (_id) {
            return $http.delete('/api/dataservice/DeleteAdverts/'+_id)
         };

         this.editAdvert = function (_id) {
            return $http.get('/api/dataservice/EditAdvert/'+_id)

         }
     }

     angular.module('myApp').service('advDetailsService',['$http',advDetailsService]);


// angular.module('myApp').service('advDetailsService',function ($http) {
//     this.getAllAdvert = function () {
//         return $http.get('/api/dataservice/GetAllAdverts').then(function (value) {
//             return value.data;
//
//         })
//
//     }
//
// });

// (function () {
//     "use strict";
//     function advDetailsService($http) {
//         this.getAllAdvert = function(){
//             return $http.get('/api/dataservice/GetAllAdverts');
//         };
//         // this.getAdvertById = function(id){
//         //     return $http.get('/api/dataservice/GetAdvertById/' + id);
//         // };
//         // this.addAdvert = function(advert){
//         //     return $http.post('/api/dataservice/CreateAdvert/', advert);
//         // };
//         // this.saveAdvert = function(advert){
//         //     return $http.put('/api/dataservice/EditAdvert/', advert);
//         // };
//         // this.deleteAdvert = function(id){
//         //     return $http.delete('/api/dataservice/DeleteAdvertById/' + id);
//         // };
//     }
//
//     angular.module('myApp').service('advDetailsService', ['$http',advDetailsService]);
// })();
//     "use strict";

// function advDetailsService($http) {
//     return {
//         getAllAdvert: function () {
//             return $http.get('/api/dataservice/GetAllAdverts');
//         }
//     };
// }
//
// angular.module('myApp').factory('advDetailsService',['$http',advDetailsService]);
