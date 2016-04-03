angular.module('OGTicketsApp.services')
.service('eventService', ['localStorageService', function(localStorageService) {

    /*register, modify, profile, list... events && register, modify, profile, list... eventsTypes*/

    var set = function (key, value){
    	localStorageService.set(key, value)
    }

    var setCreditCard = function (value) {
    	localStorageService.set("creditCardList", value)
    }


//puntos de acceso de los metodos del servicio:
	return{
		set: set,
		setCreditCard: setCreditCard
	};
}]);//end -service-