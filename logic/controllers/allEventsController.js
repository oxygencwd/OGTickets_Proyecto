angular.module('OGTicketsApp.controllers')
.controller('allEventsController', ['$scope', 'localStorageService', function ($scope, localStorageService) {
	
	$scope.eventsList= localStorageService.getAll("eventsList");
	



}]); //end -controller-