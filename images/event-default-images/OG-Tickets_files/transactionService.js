angular.module('OGTicketsApp.services')
.service('transactionService', ['localStorageService', function(localStorageService) {

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

    


//puntos de acceso de los metodos del servicio:
	return{
	setCreditCard:setCreditCard,
	generatePurchaseCode:generatePurchaseCode,
	generateReservationCode:generateReservationCode
	};
}]);//end -service-