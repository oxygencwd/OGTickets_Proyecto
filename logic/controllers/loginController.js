angular.module('OGTicketsApp.controllers')
.controller('loginController', ['$scope', 'userService', 'formService', '$location', '$routeParams', function ($scope, userService, formService, $location, $routeParams) {

	$scope.user={};
	var user= $scope.user;

	$scope.login= function () {
		var result= userService.canLogin(user);
		console.debug(result);
		var canLogin= result.canLogin;
		
		if(canLogin){
			var userId = result.user.id;
			//$location.path('/client-profile/{{userId}}');
			$scope.msg="";
			$scope.closeModal();
			formService.clear($scope, $scope.loginForm);
		}else{
			$scope.msg= result.msg;
		}

		
		
		//formService.clear($scope.loginForm);
		return result;
	};

	$scope.closeModal= function () {	
		$('#loginModal').modal('hide');
	};

}]); //end -controller-