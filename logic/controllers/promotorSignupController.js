angular.module('OGTicketsApp.controllers')
.controller('promotorSignupController', ['$scope','localStorageService', '$timeout','$window', 'formService','promotorService', '$location','$routeParams', 'dateService', function ($scope,localStorageService, $timeout, $window, formService, promotorService, $location,$routeParams,dateService) {

	var resquestId = $routeParams.requestId;
	var resquestPromotor = promotorService.getRegisterRequestById(resquestId);
	console.log(resquestPromotor);

	
	$scope.newPromotor = resquestPromotor;

	$scope.newPromotor={};
	$scope.error="";
	$scope.typePersonOptions = [
		{
			name: 'Persona jurídica',
			value: 'personaJuridica'
		},
		{
			name: 'Persona física',
			value: 'personaFisica'
		}
	];

	$scope.minAge = dateService.minimunAge18;
	$scope.maxAge = dateService.maximunAge;


	//Funcion del boton de registro promotor, agarra todos los datos del formulario.
	$scope.promotorRegister=function () {
		result= promotorService.promotorRegister($scope.newPromotor);
		var promotorId;
		if(result.value){
			promotorId= result.promotorId;
			$scope.newPromotor={};
			formService.clear($scope.formNewPromotor);
			$location.path('/promoter-profile/'+promotorId);
			$scope.error="";
		}else{
			$scope.error="Ya existe una cuenta registrada con ese correo electronico";
		}
	}; 

	//Funcion del boton de solicitud de registro de promotor, recolecta los datos que ingreso el usuario y los envia hacia el servicio.
	$scope.sendRequest= function () {
		promotorService.registerRequest($scope.newPromotor)
		.then(function(data) {
			if(data.valid){
				console.log(data);
				$scope.newPromotor={};
				formService.clear($scope.formNewPromotor);
				$scope.success= "Solicitud enviada con éxito";
				$scope.openModal("#promoterSuccessModal");
				$timeout(function() {
					$scope.closeModal("#promoterSuccessModal");
					$window.location.href = ('#/home');
					$scope.error="";
					$scope.success="";
				}, 1500);	
			}else{
				$scope.error="Correo eléctrónico ya utilizado en el sistema ó datos inválidos";
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

	$scope.dismissRequest= function () {
		// body...
	}

	//Editar promotor.
	/*var promotorId= $routeParams.promotorId;
	var currentPromotor= promotorService.retrievePromotor(promotorId);
	$scope.newPromotor= currentPromotor;
	
	if(promotorId==undefined){
		$scope.editing= false;
	}else{
		$scope.editing= true;
		currentPromotor.date= new Date(currentPromotor.date);	
	};

<<<<<<< HEAD
	if(currentPromotor.typePerson=='personaJuridica'){
		$scope.typePersonHide= true;
	}else{
		$scope.typePersonHide= false;
	};
=======
>>>>>>> DEVELOPMENT

	$scope.editPromotor=function(){
		promotorService.replacePromotor(promotorId, $scope.newPromotor);
		$scope.newPromotor={};
		formService.clear($scope.formNewPromotor);
		$location.path('/promoter-profile/'+promotorId);
	};*/
	
}]);