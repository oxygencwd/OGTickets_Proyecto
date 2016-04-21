angular.module('OGTicketsApp.directives')
.directive('myFilepicker', [function() {
    return {        
        transclude: true,
        restrict: "E",    
        template: '<input type="filepicker">',
        replace: 'true',
        link: function(scope, element) {
            filepicker.constructWidget(element);
        }
    };
}]);