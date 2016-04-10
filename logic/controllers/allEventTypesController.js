angular.module('OGTicketsApp.controllers')
.controller('allEventTypesController', ['$scope', '$location', 'eventTypeService', function ($scope, $location, eventTypeService) {
	$scope.init = function (){
		$scope.url = $location.url();
		$scope.allEveTypes = '/all-event-types';
	};


	$scope.eventTypes = eventTypeService.eventTypes;

	$scope.init();


}]); //end -controller-