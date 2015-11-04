'use strict';

angular.module('melis').directive('meliCarouser',['$window', function($window){
    return {
        restrict: 'E',
        templateUrl: 'modules/melis/client/directives/meli-carousel/views/meli-carousel.client.dtv.view.html',
        replace: true,
        scope: {
            item: '='
        },
        link: function(scope, element, attr){

            scope.activeIndex = 0;

            scope.setActiveIndex = function(index){
                scope.activeIndex = index;
            };

            scope.changeImage = function(action, index){
                if(action === 'prev'){
                    $window.$('.thumbgallery_dflt-' + (index - 1)).click();
                }
                if(action === 'next'){
                    $window.$('.thumbgallery_dflt-' + (index + 1)).click();
                }
            };
        }
    };
}
]);