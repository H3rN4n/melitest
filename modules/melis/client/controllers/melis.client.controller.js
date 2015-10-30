'use strict';

// Melis controller
angular.module('melis').controller('MelisController', ['Item', '$scope', '$stateParams', '$location', 'Authentication', 'MeliSrv', '$window',
  function(Item, $scope, $stateParams, $location, Authentication, MeliSrv, $window ) {
    var vm = this;
    vm.authentication = Authentication;

    vm.find = function(text) {
      MeliSrv.findProducts(text).then(function(data){
        vm.items = data.data.results;
      });
    };

    // Find existing Meli
    vm.findOne = function(id) {
      MeliSrv.getProduct(id).then(function(data){
        console.log(data);
        vm.item = data.data;
        console.log(vm.item);
      });
    };

    vm.build = {
      qRequired: 1
    };

    vm.addOrRemove = function(action){
      if(action === 'add' && vm.build.qRequired < vm.item.available_quantity){
        vm.build.qRequired++;
      }
      if(action === 'remove' && vm.build.qRequired > 1){
        vm.build.qRequired--;
      }
    };



    vm.buyItem = function(){
      var modal = new $window.ch.Modal();
      var message = "Lo sentimos, no contamos con stock disponible, reintente más tarde.";
      modal.show(message);
    };

    if( Item && Item.data){
      vm.item = Item.data;
    }
  }
  ]);