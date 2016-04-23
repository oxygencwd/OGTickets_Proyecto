angular.module('OGTicketsApp.controllers')
.controller('allEventsAdminController', ['$scope', '$location', 'eventService', function ($scope, $location, eventService) {

	$scope.init = function (){
		$scope.url = $location.url();
		$scope.allEventsAdmin = '/all-events-admin';
	};

	$scope.eventsList = eventService.eventsList;

	$scope.init();

}]); //end -controller-