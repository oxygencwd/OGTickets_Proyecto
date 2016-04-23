angular.module('OGTicketsApp.controllers')
.controller('redeemTicketsController', ['$scope', 'transactionService', 'eventService', 'userService', function ($scope, transactionService, eventService, userService) {

var transactions = transactionService.transactions;
var events = eventService.eventsList;
var users = userService.users;
$scope.reservationCode={};
$scope.details = false;

	$scope.reservations = function(resCode){
		var reservations = transactionService.getTransactionByCode(resCode);
		$scope.details = true;
		angular.forEach(events, function(item1) {
			angular.forEach(reservations, function(item2) {
				if(item1.id == item2.eventId) {
				item2.eventName = item1.name;
				item2.ticketsPrice = item1.ticketsPrice;
				item2.total = item2.ticketsPrice * item2.ticketsAmount;
				}
			});
		});

		angular.forEach(users, function(item1) {
			angular.forEach(reservations, function(item2) {
				if(item1.id == item2.idClient) {
				item2.userName = item1.name;
				}
			});
		});

		return reservations;
		
	};

	$scope.redeem = function(resCode){
		var transaction = transactionService.getTransactionByCode(resCode);
		var index= transactions.indexOf(angular.toJson(transaction));

		// transactions[index].redeemed = 1;

		// transactions.splice(index, 1);

		// transactions[index]=transaction; 

		// transactionService.setTransaction(transactions);
	}


}]); //end -controller-