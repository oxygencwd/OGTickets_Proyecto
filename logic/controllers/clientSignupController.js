angular.module('OGTicketsApp.controllers')
.controller('clientSignupController', ['$scope','userService','formService','clientService', '$location', function ($scope,userService, formService, clientService, $location) {

	$scope.newClient={};
	$scope.error="";

	$scope.clientRegister=function () {
		result= clientService.clientRegister($scope.newClient);
		var clientId;
		var user={};
		if(result.value){
			clientId= result.clientId;
			user.name= ($scope.newClient.firstname) + " " + ($scope.newClient.firstlastname);
			user.id= clientId;
			user.userType= "ut02";
			userService.login($scope.appLoggedUser, user);
			$scope.newClient={};
			formService.clear($scope.formNewClient);
			$location.path('/client-profile/'+ user.id);
			$scope.error="";
		}else{
			$scope.error="Ya existe una cuenta registrada con ese correo electronico";
		}
	}; 
}]);

