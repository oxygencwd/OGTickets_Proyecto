angular.module('OGTicketsApp.controllers')
.controller('loginController', ['$scope', 'userService', 'formService', function ($scope, userService, formService) {

	//recoje los datos que vienen del formulario.
	$scope.cUser={};

	//manda al servicio los datos del usuario que trata de loggearse.
	$scope.canLogin= function () {
		var objUser={};
		userService.canLogin($scope.cUser)
		.then(function(data) {
			userService.login($scope.appLoggedUser, data.user);
			$scope.error="";
			$scope.cUser={};
			formService.clear($scope.loginForm);
			$scope.closeModal();
		})
		.catch(function(error) {
			console.error("Error en el login");
			$scope.error= "E-mail o contraseña inválidos";
		});
	};

	$scope.closeModal= function () {	
		$('#loginModal').modal('hide');
	};



}]); //end -controller-

