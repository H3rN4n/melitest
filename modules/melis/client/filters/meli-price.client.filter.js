angular.module('melis')
    .filter('meliPrice', ['$sce', function($sce) {
        return function(input) {
            input = input || '';
            var out = "";
            var text = input.toString().split(".");
            text = text[0] + "<sup>" + text [1] + "</sup>";
            text = $sce.trustAsHtml(text);
            out = text;

            return out;
        };
    }
]);