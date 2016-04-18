angular.module('OGTicketsApp.controllers')
.controller('clientSignupController', ['$scope','formService','clientService', '$window', '$routeParams', '$location', function ($scope, formService, clientService, $window, $routeParams, $location) {

	$scope.newClient={};
		/*
			newClient={
				firstname**,
				secondname
				firstlastname*,
				secondlastname,
				personalId*,
				email*,
				password*,
				repeatPass*,

				dateBirth*,
				phone*,
				genre*,
				disability,
				picture
			}
		*/
	$scope.error="";

	var today = new Date();
	var minAge = 15;
	var maxAge = 100;
	$scope.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
	$scope.maxAge = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());

	//Funcion del boton de registro de cliente, toma todos los datos del formulario y los envia hacia el clientService.
	$scope.clientRegister=function () {
		clientService.clientRegister($scope.newClient)
		.then(function(data) {
			if(data.created){
				console.log(data.meta);

				//data.meta--> aqui esta el id del nuevo registro
				//mandamos a registrar el restro de los dato en la talbe cliente
			}
		})
		.catch(function(error) {
			console.log(error);
			console.error("Error Registrando el usuario.");
		});
		
		// 	$scope.newClient={};
		// 	formService.clear($scope.formNewClient);
		// 	$location.path('#/home');
		// 	$scope.openModal();
		// 	$scope.error="";
		//  }else{
		//   	$scope.error="Ya existe una cuenta registrada con ese correo electronico";
		//  }
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