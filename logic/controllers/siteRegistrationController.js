angular.module('OGTicketsApp.controllers')
.controller('siteRegistrationController', ['$scope','localStorageService','formService','siteService', '$window', function ($scope,localStorageService, formService, siteService, $window) {

	$scope.newEvent={};
	$scope.error="";

	$scope.eventRegister=function () {
		result= siteService.eventRegister($scope.newEvent);
		var eventId;
		if(result.value){
			eventId= result.eventId;
			$scope.newEvent={};
			formService.clear($scope.eventRegistrationForm);
			$window.location.href = ('#/site-profile/'+eventId);
			$scope.error="";
		}else{
			$scope.error="El sitio ya existe";
		}
	}; 

	$scope.expCapacity = /^[\ |0-9]{1,5}$/;
	$scope.expDecimalLatitude = /^-?\d{0,2}(?:,\s?\d{3})*(?:\.\d*)?$/;
	$scope.expDecimalLongitude = /^-?\d{0,3}(?:,\s?\d{3})*(?:\.\d*)?$/;
	
}]);