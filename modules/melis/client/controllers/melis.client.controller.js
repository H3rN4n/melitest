'use strict';

// Melis controller
angular.module('melis').controller('MelisController', ['Item', '$scope', '$stateParams', '$location', 'Authentication', 'MeliSrv', '$window',
  function(Item, $scope, $stateParams, $location, Authentication, MeliSrv, $window ) {
    var vm = this;
    vm.authentication = Authentication;

    //Find list of items from ML with MeliSrv
    vm.find = function(text) {
      if(text){
        vm.items = [];
        vm.isLoading = true;
        MeliSrv.findProducts(text).then(function(data){
          vm.items = data.data.results;
          vm.isLoading = false;
        });
      }
    };



    /*----------------*/
    //ITEM PAGE
    /*----------------*/

    //Bind Item Data on the scope
    if( Item && Item.data){
      vm.item = Item.data;
    }
    vm.build = {
      qRequired: 1
    };

    //Find item by ID from ML with MeliSrv
    vm.findOne = function(id) {
      MeliSrv.getProduct(id).then(function(data){
        console.log(data);
        vm.item = data.data;
        console.log(vm.item);
      });
    };


    // Add or Remove quantity of the requerired item
    vm.addOrRemove = function(action){
      if(action === 'add' && vm.build.qRequired < vm.item.available_quantity){
        vm.build.qRequired++;
      }
      if(action === 'remove' && vm.build.qRequired > 1){
        vm.build.qRequired--;
      }
    };


    // Buy button listener
    vm.buyItem = function(){
      var modal = new $window.ch.Modal();
      var message = "Lo sentimos, no contamos con stock disponible, reintente más tarde.";
      modal.show(message);
    };
  }
  ]);