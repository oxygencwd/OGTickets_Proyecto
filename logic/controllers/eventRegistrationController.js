angular.module('OGTicketsApp.controllers')
.controller('eventRegistrationController', ['$scope', 'localStorageService', function ($scope, localStorageService) {

	$scope.eventTypes = localStorageService.getAll("eventTypeList");
	console.debug($scope.eventTypes);

	var registerEvent = function (){
		localStorageService.set("eventsList", $scope.singleEvent);
		
		$scope.singleEvent = {}
	} 


}]); //end -controller-
