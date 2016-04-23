angular.module('OGTicketsApp.controllers')
.controller('clientProfileController',['$scope','userService','$routeParams','$location', 'clientService', 'transactionService', 'eventService', function ($scope, userService,$routeParams,$location, clientService, transactionService, eventService) {
	
	var clientId = $routeParams.clientId;
	var loggedUser= userService.getLoggedUser();
	var loggedUserId;

	$scope.client = {};
	
	// $scope.transactions = transactionService.retrieveTransactionsByClient(clientId);

	if(loggedUser){
		loggedUserId= loggedUser.id;
	};

	//Envia al cliente al formulario de editar datos
	$scope.editClient= function(){
        $location.path('/client-profile-edit/'+clientId);
    };

  //   $scope.events = function(){
		// angular.forEach(transactions, function(item) {
		// 	var events = transactionService.getEventsFromTransactions(item.eventId);

		// });

		// return events;
  //   };

    $scope.retrieveClient = function (){
    	var promise = clientService.retrieveClient(clientId);
		promise.then(function(data) {
			$scope.client= data.data[0];


		})
		.catch(function(error) {
			console.log(error);
		})


    };

    $scope.getClientEvents = function (){
    	var promise = clientService.getClientEvents(clientId);
		promise.then(function(data) {
			$scope.events= data.data;
			
			console.log($scope.events);
		})
		.catch(function(error) {
			console.log(error);
		})
    };

    $scope.retrieveClient();
    $scope.getClientEvents();

}]); //end -controller-