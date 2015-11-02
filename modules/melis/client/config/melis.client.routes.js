'use strict';

//Setting up route
angular.module('melis').config(['$stateProvider',
  function($stateProvider) {
    // Melis state routing
    $stateProvider.
    state('melis', {
      abstract: true,
      url: '/melis',
      template: '<ui-view/>'
    }).
    state('melis.list', {
      url: '',
      templateUrl: 'modules/melis/client/views/list-melis.client.view.html',
      controller: 'MelisController',
      controllerAs: 'vm',
      resolve : {
        Item: [
          function() {
            return false;
          }
        ]
      }
    }).
    state('melis.view', {
      url: '/:meliId',
      templateUrl: 'modules/melis/client/views/view-meli.client.view.html',
      controller: 'MelisController',
      controllerAs: 'vm',
      resolve : {
        Item: ['MeliSrv', 'MeliNotificationSrv', '$stateParams',
          function(MeliSrv, MeliNotificationSrv, $stateParams) {
            return MeliSrv.getProduct($stateParams.meliId).error(function(error, data){
              console.log(error, data);
              MeliNotificationSrv.errorConection();
            });
          }
        ]
      }
    });
  }
  ]);