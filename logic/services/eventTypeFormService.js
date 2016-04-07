angular.module('OGTicketsApp.services')
.service('eventTypeFormService', ['localStorageService', function(localStorageService) {

	var eventTypes= localStorageService.getAll("eventTypeList");

	var eventTypeId= localStorageService.setIdCounter("eventTypeIdCounter", 5);

	var eventTypeExists= function (eventType) {
		var eventTypeExists= eventTypes.filter(function (item) {
			return item.name== eventType.name;
		});
		return eventTypeExists;
	}; 

    var eventTypeRegister= function (eventType) {
    	var saved= eventTypeExists(eventType);
    	var result={};

    	if(saved.length>0){
    		result.value=false;
    		result.msj="Event Type already exists";
    	}else{
    		eventType.id= "et" + eventTypeId;
    		eventTypes.push(eventType);
    		localStorageService.set("eventTypeList", eventTypes);
    		eventTypeId++;
    		localStorageService.setId("eventTypeIdCounter", eventTypeId);
    		result.value= true;
    		result.eventTypeId= eventType.id;
    	};
    	return result;
    };

	return{
		eventTypeRegister:eventTypeRegister
	};

}]);