angular.module('OGTicketsApp.controllers')
.controller('clientSignupController', ['$scope','formService','$window','clientService', '$window', '$routeParams', '$location', '$timeout','dateService', function ($scope, formService, $window, clientService, $window, $routeParams, $location, $timeout,dateService) {

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
	$scope.success="";
	
	$scope.minAge = dateService.minimunAge15;
	$scope.maxAge = dateService.maximunAge;

	var picture = '';
	//Saves on src the url generated for the picture
	$scope.savePicture=function(src){
		picture = src;
	};

	//Funcion del boton de registro de cliente, toma todos los datos del formulario y los envia hacia el clientService.
	$scope.clientRegister=function () {
		$scope.newClient.image = picture;
		if ($scope.newClient.image==false){
			$scope.newClient.image='http://i1097.photobucket.com/albums/g342/David_Ness/profile_zpshfecwufv.png';
		};
		clientService.clientRegister($scope.newClient)
		.then(function(data) {
			if(data.valid){
				$scope.newClient={};
				formService.clear($scope.formNewClient);
				$scope.success= "Usuario creado con éxito";
				$scope.openModal("#clientRegSuccessModal");
				$timeout(function() {
					$scope.closeModal("#clientRegSuccessModal");
					$window.location.href = ('#/home');
					$scope.openModal('#loginModal');
					$scope.error="";
					$scope.success="";
				}, 1500);	
			}else{
				$scope.error="Ya existe una cuenta registrada con ese correo electronico";
			}
		})
		.catch(function() {
			console.log("Error registrando el nuevo cliente");
		});

	 }; 

	$scope.openModal= function (modalId) { 
	  $(modalId).modal('show');
	};

	$scope.closeModal= function (modalId) { 
	  $(modalId).modal('hide');
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