angular.module('OGTicketsApp.controllers')
.controller('cashierSignupController', ['$scope','formService','cashierService', '$location', function ($scope, formService, cashierService, $location) {

	$scope.newCashier={};
		/*
			newCashier={
				firstname**,
				secondname
				firstlastname*,
				secondlastname,
				personalId*,
				email*,
				
				dateBirth*,
				phone*,
				genre*
			}
		*/
	$scope.error="";
	$scope.success="";

	

	//Funcion del boton de registro de cajero, agarra todos los datos del formulario.
	$scope.cashierRegister= function () {
		cashierService.cashierRegister($scope.newCashier)
		.then(function(data) {
			var password= data.password;
			if(data.valid){
				$scope.newCashier={};
				formService.clear($scope.formNewCashier);
				
				$scope.showPass= password;
				$scope.openModal("#cashierRegSuccessModal");
				$scope.success= "Cajero creado con éxito";
				$scope.error="";
				$scope.success="";
			}			
		})
		.catch(function(error) {
			console.log("Error registrando el nuevo cajero");
		});
	}; 


	$scope.openModal= function (modalId) { 
	  $(modalId).modal('show');
	};

	$scope.goHome= function() {
		$location.path('#/home');
	}

}]);
