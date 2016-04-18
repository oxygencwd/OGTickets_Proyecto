angular.module('OGTicketsApp.controllers')
.controller('cashierSignupController', ['$scope','localStorageService','formService','cashierService', '$location', function ($scope,localStorageService, formService, cashierService, $location) {

	$scope.newCashier={};
	$scope.error="";

	var today = new Date();
	var minAge = 18;
	var maxAge = 100;
	$scope.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
	$scope.maxAge = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());

	//Funcion del boton de registro de cajero, agarra todos los datos del formulario.
	$scope.cashierRegister=function () {
		result= cashierService.cashierRegister($scope.newCashier);
		var cashierId;
		if(result.value){
			cashierId= result.cashierId;
			$scope.newCashier={};
			formService.clear($scope.formNewCashier);
			$location.path('/home');
			$scope.error="";
		}else{
			$scope.error="Ya existe una cuenta registrada con ese correo electronico";
		}
	}; 
}]);
