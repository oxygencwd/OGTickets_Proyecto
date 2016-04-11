angular.module('OGTicketsApp.controllers')
.controller('clientProfileController',['$scope','userService','$routeParams','$location', function ($scope, userService,$routeParams,$location) {
	
	var loggedUser= userService.getLoggedUser();
	var loggedUserId;

	if(loggedUser){
		loggedUserId= loggedUser.id;
	};

	//Envia al cliente al formulario de editar datos
	$scope.editClient= function(){
        var clientId = $routeParams.clientId;
        $location.path('/client-profile-edit/'+clientId);
    };


}]); //end -controller-