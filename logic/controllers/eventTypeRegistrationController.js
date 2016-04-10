angular.module('OGTicketsApp.controllers')
.controller('eventTypeRegistrationController', ['$scope','localStorageService','formService','eventTypeService', '$location', function ($scope,localStorageService, formService, eventTypeService, $location) {

	$scope.newEventType={};
	$scope.error="";

	//Funcion del boton de registro de tipo de evento, agarra todos los datos del formulario.
	$scope.eventTypeRegister=function () {
		result= eventTypeService.eventTypeRegister($scope.newEventType);
		var eventTypeId;
		if(result.value){
			eventTypeId= result.eventTypeId;
			$scope.newEventType={};
			formService.clear($scope.formNewEventType);
			$location.path('/event-type-profile/'+eventTypeId);
			$scope.error="";
		}else{
			$scope.error="Ya existe un tipo de evento registrada con ese nombre";
		}
	}; 
}]); //end -controller-