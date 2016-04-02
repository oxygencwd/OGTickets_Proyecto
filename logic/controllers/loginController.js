angular.module('OGTicketsApp.controllers')
.controller('loginController', ['$scope', 'userService', 'formService', function ($scope, userService, formService) {

	//recoje los datos que vienen del formulario.
	$scope.cUser={};

	//autentica el usuario y ejecuta el inicio de sesión
	$scope.canLogin= function () {
		var result={};
		result= userService.canLogin($scope.cUser);
		if(result.canLogin){
			userService.login($scope.appLoggedUser, result.user);
			$scope.error="";
			$scope.cUser={};
			formService.clear($scope.loginForm);
			$scope.closeModal();
		}else{
			$scope.error= "E-mail o contraseña inválidos";
		}
	};

	$scope.closeModal= function () {	
		$('#loginModal').modal('hide');
	};

}]); //end -controller-

