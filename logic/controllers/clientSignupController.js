angular.module('OGTicketsApp.controllers')
.controller('clientSignupController', ['$scope','localStorageService','formService','clientService', '$location', function ($scope,localStorageService, formService, clientService, $location) {

	$scope.newClient={};
	$scope.error="";

	$scope.clientRegister=function () {
		result= clientService.clientRegister($scope.newClient);
		var clientId;
		if(result.value){
			clientId= result.clientId;
			$scope.newClient={};
			formService.clear($scope.formNewClient);
			$location.path('/client-profile/'+clientId);
			$scope.error="";
		}else{
			$scope.error="Ya existe una cuenta registrada con ese correo electronico";
		}
	}; 
}]);