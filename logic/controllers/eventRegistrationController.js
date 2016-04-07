angular.module('OGTicketsApp.controllers')
.controller('eventRegistrationController', ['$scope','localStorageService','formService','eventFormService', '$window', function ($scope,localStorageService, formService, eventFormService, $window) {

	$scope.eventTypes = localStorageService.getAll("eventTypeList");
	$scope.sites = localStorageService.getAll("siteList");
	$scope.newEvent={};
	$scope.error="";

	$scope.registerEvent=function () {
		result= eventFormService.registerEvent($scope.newEvent);
		var eventId;
		if(result.value){
			eventId= result.eventId;
			$scope.newEvent={};
			formService.clear($scope.eventRegistrationForm);
			$window.location.href = ('#/event-profile/'+eventId);
			$scope.error="";
		}else{
			$scope.error="El evento ya existe";
		}
	}; 
}]);