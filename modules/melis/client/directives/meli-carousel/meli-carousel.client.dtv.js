angular.module('melis').directive('meliCarouser', function(){
    return {
        restrict: 'E',
        templateUrl: 'modules/melis/client/directives/meli-carousel/views/meli-carousel.client.dtv.view.html',
        transclude: true,
        scope: {
            item: '='
        },
        link: function(scope, element, attr){
            console.log(scope);
        }
    };
});