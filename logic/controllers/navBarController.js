angular.module('OGTicketsApp.controllers')
.controller('navBarController', ['$scope', 'userService', function ($scope, userService) {
	
	$scope.logout= function () {
		userService.logout($scope.appLoggedUser);	
	};

	$scope.isLoggedIn= userService.isLoggedIn($scope.appLoggedUser);



}]); //end -controller-