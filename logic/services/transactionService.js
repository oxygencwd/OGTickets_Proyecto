angular.module('OGTicketsApp.services')
.service('transactionService', ['localStorageService', function(localStorageService) {

	// Saves credit card into database
    // Param value is the credit card object
    var setCreditCard = function (value) {
    	localStorageService.set("creditCardList", value)
    };

    


//puntos de acceso de los metodos del servicio:
	return{
	setCreditCard:setCreditCard
	};
}]);//end -service-