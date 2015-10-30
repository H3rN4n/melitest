'use strict';
angular.module('core')

.directive('preventDefault', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      console.log('preventDefault');
      element.bind('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
      });
    }
  };
});

