angular.module('OGTicketsApp.controllers')
.controller('loginController', ['$scope', 'userService', 'formService', '$location', '$routeParams', function ($scope, userService, formService, $location, $routeParams) {

	$scope.user={};
	var user= $scope.user;

	$scope.login= function () {
		var result= userService.canLogin(user);
		var canLogin= result.canLogin;
		var usuario = result.user;
		console.log(usuario);
		//var user= result.user.id;
		//console.log(user);
		// var usuario = angular.fromJson(usuario);
		// console.log(usuario);
		if(canLogin){
			$location.path('/client-profile/userId');
			$scope.msg="";
			$scope.closeModal();
			formService.clear($scope, $scope.loginForm);
		}else{
			$scope.msg= result.msg;
		}

		
		
		//formService.clear($scope.loginForm);
		return result;
	};

	$scope.login();

	$scope.closeModal= function () {	
		$('#loginModal').modal('hide');
	};

}]); //end -controller-