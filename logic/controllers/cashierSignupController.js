angular.module('OGTicketsApp.controllers')
.controller('cashierSignupController', ['$scope','formService','cashierService', '$window', '$location','dateService', function ($scope, formService, cashierService, $window, $location, dateService) {

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

	
	$scope.minAge = dateService.minimunAge18;
	$scope.maxAge = dateService.maximunAge;

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
		$window.location.href = ('#/home');
	}

}]);
