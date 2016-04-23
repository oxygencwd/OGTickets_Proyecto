angular.module('OGTicketsApp.services')
.service('transactionService', ['localStorageService', 'eventService', function(localStorageService, eventService) {

	// Saves credit card into database
    // Param value is the credit card object
    var setCreditCard = function (value) {
    	localStorageService.set("creditCardList", value)
    };

    var generatePurchaseCode= function (idClient, idEvent) {
    	var time = new Date().getTime();
    	return "PU-" + idClient + "-" + idEvent + "-" + time;
    };

    var generateReservationCode= function (idClient, idEvent) {
    	var time = new Date().getTime();
    	return "RE-" + idClient + "-" + idEvent + "-" + time;
    };

    var transactions= localStorageService.getAll("transactionList");
    var events= eventService.eventsList;

    //Retrieves the transactions by client. Params clientID

    var retrieveTransactionsByClient = function (cId){
        result = transactions.filter(function (item) {
            return item.idClient == cId;
        });
        return result;
    };

    //Retrieves the events from the transaction eventID. Params TransactionID

    var getEventsFromTransactions = function (transEventId){
        result = events.filter(function (item) {
            return item.id == transEventId;
        });
        return result;
    };


    var setTransaction= function (transaction) {
        var defer= $q.defer();
        var url= 'back-end/index.php/transaction/saveTransaction';

        $http.post(url, transaction)
        .success(function(data, status) {
            // console.info(data);
            defer.resolve(data);
        })
        .error(function(error, status) {
            // console.info(error);
            defer.reject(error);
            $log.error(error, status);
        });

        return defer.promise;
    };

    


//puntos de acceso de los metodos del servicio:
	return{
	setCreditCard:setCreditCard,
    setTransaction:setTransaction,
	generatePurchaseCode:generatePurchaseCode,
	generateReservationCode:generateReservationCode,
    transactions:transactions,
    retrieveTransactionsByClient:retrieveTransactionsByClient,
    getEventsFromTransactions:getEventsFromTransactions
	};
}]);//end -service-