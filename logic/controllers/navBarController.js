angular.module('OGTicketsApp.controllers')
.controller('navBarController', ['$scope', 'userService', '$location', function ($scope, userService, $location) {
	
	$scope.logout= function () {
		userService.logout($scope.appLoggedUser);	
		$location.path('/home');
	};

}]); //end -controller-