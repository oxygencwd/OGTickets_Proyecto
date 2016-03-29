angular.module('OGTicketsApp.controllers')
.controller('eventRegistrationController', ['$scope', 'localStorageService', function ($scope, localStorageService) {

	$scope.eventTypes = localStorageService.getAll("eventTypeList");

	$scope.singleEvent = {
		name: '',
		eventType: 'music',
		description: '',
		startHour: '',
		endHour: ''
	}

	var registerEvent = function (){
		localStorageService.set("eventsList", $scope.singleEvent);
		
		$scope.singleEvent = {}
	}


}]); //end -controller-