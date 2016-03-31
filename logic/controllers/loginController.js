angular.module('OGTicketsApp.controllers')
.controller('loginController', ['$scope', function ($scope) {

	$scope.user={};

	// $scope.login= function () {
	// 	userService.canLogin(user);
	// 	formService.clearForm($scope.loginForm);
	// };

	

	$scope.closeModal= function () {	
		$('#loginModal').modal('hide');
	};

}]); //end -controller-