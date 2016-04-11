angular.module('OGTicketsApp.controllers')
.controller('promoterProfileController', ['$scope','userService','$routeParams','$location', function ($scope, userService,$routeParams,$location){
	
	var promotorId = $routeParams.promotorId;

	//Envia al cliente al formulario de editar datos
	$scope.editPromotor= function(){
        var promotorId = $routeParams.promotorId;
        $location.path('/promoter-profile-edit/'+promotorId);
    };

}]); //end -controller-