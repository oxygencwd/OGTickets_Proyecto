angular.module('OGTicketsApp.controllers')
.controller('promotorSignupController', ['$scope','localStorageService','formService','promotorService', '$location', function ($scope,localStorageService, formService, promotorService, $location) {

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
	
}]);