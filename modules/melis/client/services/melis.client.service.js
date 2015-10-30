'use strict';

//Melis service used to communicate Melis REST endpoints
angular.module('melis').factory('MeliSrv', ['$http', '$q',
  function($http, $q) {
    return {
      findProducts: function(text){
        return $http.get('https://api.mercadolibre.com/sites/MLA/search?q=' + text);
      },
      getProduct : function(id){
        return $http.get('https://api.mercadolibre.com/items/' + id);
      }
    };
  }
  ]);