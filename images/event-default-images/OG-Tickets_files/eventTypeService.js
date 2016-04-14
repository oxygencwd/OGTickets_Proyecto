angular.module('OGTicketsApp.services')
.service('eventTypeService', ['localStorageService', function(localStorageService) {

    //Llama a todos los tipos de eventos guardados en eventTypeList.
	var eventTypes= localStorageService.getAll("eventTypeList");

    //Genera un contador de id
	var eventTypeId= localStorageService.setIdCounter("eventTypeIdCounter", 5);

    //Revisa el nombre del tipo de evento que se va a registrar, para saber si ya existe o no.
	var eventTypeExists= function (eventType) {
		var eventTypeExists= eventTypes.filter(function (item) {
			return item.name== eventType.name;
		});
		return eventTypeExists;
	}; 

    //Toma todos los datos del formulario, agrega el prefijo de tipo de evento y luego son guardados en eventTypeList.
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

    //retrieves event type with the id given in the param
    var retrieveEventType = function (eId){
        result = eventTypes.filter(function (item) {
            return item.id == eId;
        });
        return result[0];
    };

	return{
        eventTypes:eventTypes,
		eventTypeRegister:eventTypeRegister,
        retrieveEventType:retrieveEventType
	};

}]);