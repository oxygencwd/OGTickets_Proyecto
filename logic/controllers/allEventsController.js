angular.module('OGTicketsApp.controllers')
.controller('allEventsController', ['$scope', 'eventService', function ($scope, eventService) {
	/*displat events, serch bar*/
	$scope.eventsList= eventService.activeEvents();

}]); //end -controller-
