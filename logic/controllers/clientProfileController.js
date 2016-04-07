angular.module('OGTicketsApp.controllers')
.controller('clientProfileController',['$scope','userService', function ($scope, userService) {
	
	var loggedUser= userService.getLoggedUser();
	var loggedUserId;

	if(loggedUser){
		loggedUserId= loggedUser.id;
	};

}]); //end -controller-