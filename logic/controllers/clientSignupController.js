angular.module('OGTicketsApp.controllers')
.controller('clientSignupController', ['$scope','userService','formService','clientFormService', '$window', '$routeParams', '$location', function ($scope,userService, formService, clientFormService, $window, $routeParams, $location) {

	$scope.newClient={};
	$scope.error="";

	$scope.clientRegister=function () {
		result= clientFormService.clientRegister($scope.newClient);
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
			$location.path('/client-profile/'+clientId);
			$scope.error="";
		}else{
			$scope.error="Ya existe una cuenta registrada con ese correo electronico";
		}
	}; 
}]);


/*/myURL/?param=value*/