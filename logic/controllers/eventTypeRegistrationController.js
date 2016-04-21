angular.module('OGTicketsApp.controllers')
.controller('eventTypeRegistrationController', ['$scope','localStorageService','formService','eventTypeService', '$location','$routeParams', function ($scope,localStorageService, formService, eventTypeService, $location,$routeParams) {

	$scope.newEventType={};
	$scope.error="";

	var picture = '';
	//Saves on src the url generated for the picture
	$scope.savePicture=function(src){
		picture = src;
	};

	//Funcion del boton de registro de tipo de evento, agarra todos los datos del formulario.
	$scope.eventTypeRegister=function () {
		$scope.newEventType.image = picture;
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

	//Editar cliente.
	var eventTypeId= $routeParams.eventTypeId;
	var currentEventType= eventTypeService.retrieveEventType(eventTypeId);
	$scope.newEventType= currentEventType;
	

	if(eventTypeId==undefined){
		$scope.editing= false;
	}else{
		$scope.editing= true;
	};

	$scope.editEventType=function(){
		eventTypeService.replaceEventType(eventTypeId, $scope.newEventType);
		$scope.newEventType={};
		formService.clear($scope.formNewEventType);
		$location.path('/event-type-profile/'+eventTypeId);
	};

}]); //end -controller-