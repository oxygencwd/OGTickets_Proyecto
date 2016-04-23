angular.module('OGTicketsApp.controllers')
.controller('allEventTypesController', ['$scope', '$location', 'eventTypeService','eventService', function ($scope, $location, eventTypeService,eventService) {
	$scope.init = function (){
		$scope.url = $location.url();
		$scope.allEveTypes = '/all-event-types';
		getActiveEventType();
	};

	var getActiveEventType = function (){
		var promise = eventService.getEventTypeList();
		promise.then(function(data) {
			$scope.eventTypeList= data.data;
		})
		.catch(function(error) {
			console.log(error);
		})
	};

	$scope.init();

}]); //end -controller-