'use strict';

angular.module('melis')
    .filter('dueCalculator', ['$sce', function($sce) {
        return function(input) {
            input = input || '';

            return (parseInt(input) / 12);
        };
    }
]);