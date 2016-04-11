angular.module('OGTicketsApp.controllers')
.controller('clientSignupController', ['$scope','userService','formService','clientService', '$window', '$routeParams', '$location', function ($scope,userService, formService, clientService, $window, $routeParams, $location) {

	$scope.newClient={};
	$scope.error="";

	//Funcion del boton de registro de cliente, agarra todos los datos del formulario.
	$scope.clientRegister=function () {
		result= clientService.clientRegister($scope.newClient);
		console.debug($scope.newClient);
		var clientId;
		var user={};
	 if(result.value){
		clientId= result.clientId;
		user.name= ($scope.newClient.firstname) + " " + ($scope.newClient.firstlastname);
		user.id= clientId;
		user.userType= "ut02";
		$scope.newClient={};
		formService.clear($scope.formNewClient);
		$location.path('#/home');
		$scope.openModal();
		$scope.error="";
	 }else{
	  	$scope.error="Ya existe una cuenta registrada con ese correo electronico";
	 }
	 }; 

	$scope.openModal= function () { 
	  $('#loginModal').modal('show');
	};

	//Editar cliente.
	var clientId= $routeParams.clientId;
	var currentClient= clientService.retrieveClient(clientId);
	$scope.newClient= currentClient;
	

	if(clientId==undefined){
		$scope.editing= false;
	}else{
		$scope.editing= true;
		currentClient.date= new Date(currentClient.date);	
	};

	$scope.editClient=function(){
		clientService.replaceClient(clientId, $scope.newClient);
		$scope.newClient={};
		formService.clear($scope.formNewClient);
		$window.location.href = ('#/client-profile/'+clientId);
	};

}]);


/*/myURL/?param=value*/