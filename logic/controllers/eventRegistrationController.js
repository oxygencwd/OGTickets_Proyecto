angular.module('OGTicketsApp.controllers')
.controller('eventRegistrationController', ['$scope','localStorageService','formService','eventService', '$window', function ($scope,localStorageService, formService, eventService, $window) {

	$scope.eventTypes = localStorageService.getAll("eventTypeList");
	$scope.sites = localStorageService.getAll("siteList");
	$scope.newEvent={};
	$scope.error="";

	//Funcion del boton de registro de evento, agarra todos los datos del formulario.
	$scope.registerEvent=function () {
		result= eventService.registerEvent($scope.newEvent);
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