angular.module('OGTicketsApp.controllers')
.controller('eventRegistrationController', ['$scope','localStorageService','formService','eventService', '$window','$routeParams','userService','siteService', function ($scope,localStorageService, formService, eventService, $window,$routeParams,userService,siteService) {
	
	$scope.eventTypes= eventService.getEventTypeList();
	$scope.sites= siteService.getSiteList();
	
	$scope.newEvent={};
	/*  newEvent= {
		eventType
        siteId
        name
        description
        date
        startHour
        endHour
        ticketsPrice
        image
	 */
	$scope.error="";


	//Funcion del boton de registro de evento, envia todos los datos del formulario hacia el servicio.
	$scope.registerEvent=function () {
		eventService.registerEvent($scope.newEvent);
		// var eventId;
		// if(result.value){
		// 	eventId= result.eventId;
		// 	$scope.newEvent={};
		// 	formService.clear($scope.eventRegistrationForm);
		// 	$window.location.href = ('#/event-profile/'+eventId);
		// 	$scope.error="";
		// }else{
		// 	$scope.error="El evento ya existe";
		// }
	}; 


	//edit the event.
	var eventId= $routeParams.eventId;
	var currentEvent= eventService.retrieveEvent(eventId);
	$scope.newEvent= currentEvent;
	
	if(eventId==undefined){
		$scope.editing= false;
	}else{
		$scope.editing= true;
		currentEvent.date= new Date(currentEvent.date);		
	};

	$scope.editEvent=function(){
		eventService.replaceEvent(eventId, $scope.newEvent);
		$scope.newEvent={};
		formService.clear($scope.eventRegistrationForm);
		$window.location.href = ('#/event-profile/'+eventId);
	};

}]);