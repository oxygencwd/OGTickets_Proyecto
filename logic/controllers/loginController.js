angular.module('OGTicketsApp.controllers')
.controller('loginController', ['$scope', 'userService', 'formService', function ($scope, userService, formService) {

	//recoje los datos que vienen del formulario.
	$scope.cUser={};

	//manda al servicio los datos del usuario que trata de loggearse.
	$scope.canLogin= function () {
		var objUser={};
		userService.canLogin($scope.cUser)
		.then(function(data) {
			console.log(data);
			if(data.user){
				userService.login($scope.appLoggedUser, data.user);
				$scope.error="";
				$scope.cUser={};
				formService.clear($scope.loginForm);
				$scope.closeModal();
			}else{
				$scope.error= "E-mail o contraseña inválidos";
			}
		})
		.catch(function(error) {
			console.error("Error en el login");
			
		});
	};



	// $scope.canLogin= function () {
	// 	var objUser={};
	// 	userService.canLogin($scope.cUser)
	// 	.success(function(response) {
	// 		userService.login($scope.appLoggedUser, response.user);
	// 		console.info(response.message);
	// 		$scope.error="";
	// 		$scope.cUser={};
	// 		formService.clear($scope.loginForm);
	// 		$scope.closeModal();
	// 	})
	// 	.error(function(error) {
	// 		console.error("Error en la solicitud al servidor");
	// 	});
	// };

	$scope.closeModal= function () {	
		$('#loginModal').modal('hide');
	};



}]); //end -controller-

