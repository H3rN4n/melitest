'use strict';

//Melis service used to communicate Melis REST endpoints
angular.module('melis').service('MeliNotificationSrv', ['$window',
  function($window) {
    return {
      errorConection: function(text){
        var modal = new $window.ch.Modal();
        var message = "Lo sentimos, no pudimos conectar con el servidor.";
        modal.show(message);
      }
    };
  }
  ]);