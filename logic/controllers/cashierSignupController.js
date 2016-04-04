angular.module('OGTicketsApp.controllers')
.controller('cashierSignupController', ['$scope','localStorageService','formService','cashierService', '$location', function ($scope,localStorageService, formService, cashierService, $location) {

	$scope.newCashier={};
	$scope.error="";

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
