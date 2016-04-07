angular.module('OGTicketsApp.controllers')
.controller('allEventTypesController', ['$scope', '$location', function ($scope, $location) {
	
$scope.url = $location.url();
$scope.allEveTypes = '/all-event-types';

}]); //end -controller-