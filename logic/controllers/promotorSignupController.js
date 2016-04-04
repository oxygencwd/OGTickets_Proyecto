angular.module('OGTicketsApp.controllers')
.controller('promotorSignupController', ['$scope','localStorageService','formService','promotorService', '$location', function ($scope,localStorageService, formService, promotorService, $location) {

	$scope.newPromotor={};
	$scope.error="";

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
}]);