angular.module('OGTicketsApp.services')
.service('eventFormService', ['localStorageService','userService', function(localStorageService,userService) {

	var events= localStorageService.getAll("eventsList");

	var eventId= localStorageService.setIdCounter("eventIdCounter", 4);

	var eventExists= function (event) {
		var eventExists= events.filter(function (item) {
			return item.name== event.name;
		});
		return eventExists;
	}; 

    var registerEvent= function (event) {
    	var saved= eventExists(event);
    	var result={};
        var currentUser = userService.getLoggedUser();

    	if(saved.length>0){
    		result.value=false;
    		result.msj="Event already exists";
    	}else{
    		event.id= "ev" + eventId;
            event.active= true;
            event.userCreatorId = currentUser.id;
    		events.push(event);
    		localStorageService.set("eventsList", events);
    		eventId++;
    		localStorageService.setId("eventIdCounter", eventId);
    		result.value= true;
    		result.eventId= event.id;
    	};
    	return result;
    };

	return{
		registerEvent:registerEvent
	};
}]);