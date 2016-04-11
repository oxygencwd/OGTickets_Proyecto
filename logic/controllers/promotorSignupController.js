angular.module('OGTicketsApp.controllers')
.controller('promotorSignupController', ['$scope','localStorageService','formService','promotorService', '$location','$routeParams', function ($scope,localStorageService, formService, promotorService, $location,$routeParams) {

	$scope.newPromotor={};
	$scope.error="";

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

	//Funcion del boton de solicitud de registro de promotor, agarra todos los datos del formulario.
	$scope.sendRequest= function () {
		result= promotorFormService.promotorRequest($scope.newPromotor);
		if(result.value){
			$scope.newPromotor={};
			formService.clear($scope.formNewPromotor);
			$scope.error="Solicitud enviada";
		}else{
			$scope.error="Ya existe una cuenta registrada con ese correo electronico";
		}
	};

	$scope.dismissRequest= function () {
		// body...
	}

	//Editar cliente.
	var promotorId= $routeParams.promotorId;
	var currentPromotor= promotorService.retrievePromotor(promotorId);
	$scope.newPromotor= currentPromotor;
	

	if(promotorId==undefined){
		$scope.editing= false;
	}else{
		$scope.editing= true;
	};

	$scope.editPromotor=function(){
		promotorService.replacePromotor(promotorId, $scope.newPromotor);
		$scope.newPromotor={};
		formService.clear($scope.formNewPromotor);
		$window.location.href = ('#/promoter-profile/'+promotorId);
	};
	
}]);