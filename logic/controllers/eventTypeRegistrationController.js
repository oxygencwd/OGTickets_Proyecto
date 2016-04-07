angular.module('OGTicketsApp.controllers')
.controller('eventTypeRegistrationController', ['$scope','localStorageService','formService','eventTypeFormService', '$location', function ($scope,localStorageService, formService, eventTypeFormService, $location) {

	$scope.newEventType={};
	$scope.error="";

	$scope.eventTypeRegister=function () {
		result= eventTypeFormService.eventTypeRegister($scope.newEventType);
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