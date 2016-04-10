angular.module('OGTicketsApp.controllers')
.controller('eventTypeController', ['$scope','$routeParams', 'eventTypeService', function ($scope, $routeParams, eventTypeService) {
	
	
	var eventTypeId = $routeParams.eventTypeId;

	// Sets on "currentEventType" the whole event by the id
    $scope.currentEventType = eventTypeService.retrieveEventType(eventTypeId);

}]); //end -controller-