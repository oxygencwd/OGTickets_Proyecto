angular.module('OGTicketsApp.controllers')
.controller('eventRegistrationController', ['$scope','localStorageService','formService','eventService', '$window','$routeParams','userService','siteService', function ($scope,localStorageService, formService, eventService, $window,$routeParams,userService,siteService) {
	
	$scope.init= function () {
		getEventTypeList();
		getSitesList();
	}

	$scope.eventTypes=[];
	$scope.sites=[];

	function getEventTypeList() {
		var promise= eventService.getEventTypeList();
		promise.then(function(data) {
			$scope.eventTypes= data.data;
		})
		.catch(function(error) {
			console.error(error);
			console.log("Error en la solicitud de datos");
		})

	}

	var getSitesList= function() {
		var promise= siteService.getSiteList();
		promise.then(function(data) {
			$scope.sites= data.data;
		})
		.catch(function(error) {
			console.log(error);
			console.log("Error en la solicitud de datos");
		});
	}




	
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
		console.log($scope.newEvent);
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




	$scope.init();

}]);