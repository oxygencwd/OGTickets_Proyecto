angular.module('OGTicketsApp.controllers')
.controller('allEventsAdminController', ['$scope', '$location', 'eventService', function ($scope, $location, eventService) {

	$scope.init = function (){
		$scope.url = $location.url();
		$scope.allEventsAdmin = '/all-events-admin';
		getActiveEvents();
	};


	var getActiveEvents = function (){
		var promise = eventService.activeEvents();
		promise.then(function(data) {
			$scope.eventsList= data.data;

		})
		.catch(function(error) {
			console.log(error);
		})
	};

	$scope.init();

}]); //end -controller-