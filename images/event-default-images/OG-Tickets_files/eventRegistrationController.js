angular.module('OGTicketsApp.controllers')
.controller('eventRegistrationController', ['$scope','localStorageService','formService','eventService', '$window','$routeParams','userService','siteService', function ($scope,localStorageService, formService, eventService, $window,$routeParams,userService,siteService) {
	
	$scope.eventTypes= eventService.getEventTypeList();
	$scope.sites= siteService.getSiteList();
	
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


	//edit the event.
	var eventId= $routeParams.eventId;
	var currentEvent= eventService.retrieveEvent(eventId);
	currentEvent.date= new Date(currentEvent.date);
	$scope.newEvent= currentEvent;
	

	if(eventId==undefined){
		$scope.editing= false;
	}else{
		$scope.editing= true;
		
	};

	$scope.editEvent=function(){
		eventService.replaceEvent(eventId, $scope.newEvent);
		$scope.newEvent={};
		formService.clear($scope.eventRegistrationForm);
		$window.location.href = ('#/event-profile/'+eventId);
	};

}]);