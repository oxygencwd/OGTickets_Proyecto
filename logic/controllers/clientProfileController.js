angular.module('OGTicketsApp.controllers')
.controller('clientProfileController',['$scope','userService','$routeParams','$location', 'clientService', 'transactionService', 'eventService', function ($scope, userService,$routeParams,$location, clientService, transactionService, eventService) {
	
	var clientId = $routeParams.clientId;
	var loggedUser= userService.getLoggedUser();
	var loggedUserId;
	$scope.client = clientService.retrieveClient(clientId);
	$scope.transactions = transactionService.retrieveTransactionsByClient(clientId);

	if(loggedUser){
		loggedUserId= loggedUser.id;
	};
	

	//Envia al cliente al formulario de editar datos
	$scope.editClient= function(){
        $location.path('/client-profile-edit/'+clientId);
    };

    $scope.events = function(){
		angular.forEach(transactions, function(item) {
			var events = transactionService.getEventsFromTransactions(item.eventId);

		});

		return events;
    };

}]); //end -controller-