angular.module('OGTicketsApp.controllers')
.controller('eventRegistrationController', ['$scope', 'localStorageService','formService','eventService', '$window','$routeParams','userService','siteService','dateService', function ($scope, localStorageService, formService, eventService, $window,$routeParams,userService,siteService,dateService) {
	
	$scope.init= function () {
		getEventTypeList();
		getSitesList();
	}

	$scope.eventTypes=[];
	$scope.sites=[];
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

	$scope.minDate = dateService.minimunDate;

	var picture = '';

//Saves on src the url generated for the picture
	$scope.savePicture=function(src){
		picture = src;
	};

	
//Funcion del boton de registro de evento, toma los datos del formulario y los envia hacia el servicio, despues recibe la respues y muestra el resultado.
	$scope.registerEvent=function () {
		var cUser= $scope.appLoggedUser;
		console.log(cUser);
		var userId= cUser.userId;
		var userType= cUser.userType;
		console.log(userType);
		$scope.newEvent.image = picture;

		eventService.registerEvent($scope.newEvent, userId)
		.then(function(data) {
			if(data.valid){
				$scope.newEvent={};
				formService.clear($scope.eventRegistrationForm);
				$scope.success= "Evento creado con éxito";
				$scope.openModal("#eventRegSuccessModal");
				$timeout(function() {
					$scope.closeModal("#eventRegSuccessModal");
					$scope.error="";
					$scope.success="";
				}, 1500);	
			}else{
				$scope.error="Ya existe un evento con ese nombre";
			}
		})
		.catch(function() {
			console.log("Error registrando el nuevo evento");
		});
		eventService.registerEvent($scope.newEvent, userId, userType);
	}; 

	$scope.openModal= function (modalId) { 
	  $(modalId).modal('show');
	};

	$scope.goProfile= function() {
		$window.location.href = ('#/event-profile/'+eventId);
	}

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


//edit the event.
	var eventId= $routeParams.eventId;
	//var currentEvent= eventService.retrieveEvent(eventId);
	//$scope.newEvent= currentEvent;
	
	if(eventId==undefined){
		$scope.editing= false;
	}else{
		$scope.editing= true;
		currentEvent.date= new Date(currentEvent.date);		
	};

	// $scope.editEvent=function(){
	// 	eventService.replaceEvent(eventId, $scope.newEvent);
	// 	$scope.newEvent={};
	// 	formService.clear($scope.eventRegistrationForm);
	// 	$window.location.href = ('#/event-profile/'+eventId);
	// };

	$scope.init();

}]);