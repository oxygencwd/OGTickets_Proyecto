angular.module('OGTicketsApp.controllers')
.controller('promotorSignupController', ['$scope','localStorageService','formService','promotorFormService', '$location', function ($scope,localStorageService, formService, promotorFormService, $location) {

	$scope.newPromotor={};
	$scope.error="";

	$scope.promotorRegister=function () {
		result= promotorFormService.promotorRegister($scope.newPromotor);
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