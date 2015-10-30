'use strict';

// Configuring the Melis module
angular.module('melis').run(['Menus',
  function(Menus) {
    // Add the Melis dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Melis',
      state: 'melis',
      type: 'dropdown'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'melis', {
      title: 'List Melis',
      state: 'melis.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'melis', {
      title: 'Create Meli',
      state: 'melis.create'
    });
  }
  ]);