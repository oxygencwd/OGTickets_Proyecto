angular.module('OGTicketsApp.directives')
.directive('cardExpiration', function() {

var directive =
        { require: 'ngModel', link: function(scope, elm, attrs, ctrl){
            scope.$watch('[ccinfo.month,ccinfo.year]',function(value){
              ctrl.$setValidity('invalid',true)
              if ( scope.ccinfo.year == scope.currentYear
                   && scope.ccinfo.month <= scope.currentMonth
                 ) {
                ctrl.$setValidity('invalid',false)
              }
              return value
            },true)
          }
        }
  return directive
})