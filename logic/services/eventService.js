angular.module('OGTicketsApp.services')
.service('eventService', ['localStorageService', function(localStorageService) {

	// Saves on "eventsList" all the events saved on the database
    var eventsList = localStorageService.getAll("eventsList");

    //retrieves the whole event object by its id
    //Param is the event id
    var retrieveEvent = function (eId){
    	result = eventsList.filter(function (item) {
    		return item.id == eId;
    	});
    	return result;
    };

    // General setting function
    // Params are the List key and the value to save
    var set = function (key, value){
    	localStorageService.set(key, value)
    };

    // Saves credit card into database
    // Param value is the credit card object
    var setCreditCard = function (value) {
    	localStorageService.set("creditCardList", value)
    };



	return{
		set: set,
		setCreditCard: setCreditCard,
		retrieveEvent: retrieveEvent
	};
}]);//end -service-