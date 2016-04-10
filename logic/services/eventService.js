angular.module('OGTicketsApp.services')
.service('eventService', ['localStorageService','userService','$http', function(localStorageService, userService,$http) {

	// Saves on "eventsList" all the events saved on the database, (active and inactive events.)
    var eventsList = localStorageService.getAll("eventsList");

    //Genera un contador de id
    var eventId= localStorageService.setIdCounter("eventIdCounter", 4);


    //active events= only active events can be display to clientes
    var activeEvents= function (){
        result = eventsList.filter(function (item) {
            return item.active == true;
        });
        return result;
    };

    //retrieves the whole event object by its id
    //Param is the event id
    var retrieveEvent = function (eId){
        result = eventsList.filter(function (item) {
            return item.id == eId;
        });
        return result[0];
    };

    //toma los eventos y los filtra paa obtener solo los de fecha actual
    var todayEvents= function (){
        var date= new Date();
            date= getParseDate(date);
        result = eventsList.filter(function (item) {
            var itemDate= new Date(item.date);
                itemDate= getParseDate(itemDate);
            return itemDate == date;
        });
        return result;
    };

    //lista de eventos pertenecientes a un tipo de evento
    //params el id del tipo de evento solicitado
    var eventsByType= function (typeId){
        active= activeEvents();
        result = active.filter(function (item) {
            return item.eventType == typeId;
        });
        return result;
    };

    //llevar de string a date las fechas
    var getParseDate= function (date) {
        var day= date.getDate(),
            month= date.getMonth(),
            year= date.getFullYear();
         
        var parseDate= (day+" "+month+" "+year);
        return parseDate;
    };

    //lista de  todos tipos de evento activos
    var getEventTypeList= function () {
        var allTypes= localStorageService.getAll("eventTypeList");
        result = allTypes.filter(function (item) {
            return item.active == true;
        });
        return result;
    };

    //evento devuelve uj tipo de evento identificado por el id parametro
    getEventType= function (typeId) {
        var typeList= getEventTypeList();
        result = typeList.filter(function (item) {
            return item.id == typeId;
        });
        return result[0];

    };

    var prueba= function (email, password) {
        url= 'back-end/index.php/user/login';
        var requestBody={
            email: email,
            password:password
        };
        var result= {}; // tienen que estar definidas las variables.
        result= $http.post(url, requestBody);
        return result;
    };

    //Revisa el nombre del evento que se va a registrar, para saber si ya existe o no.
    var eventExists= function (event) {
        var eventExists= eventsList.filter(function (item) {
            return item.name== event.name;
        });
        return eventExists;
    }; 

    //Toma todos los datos del formulario, agrega el prefijo de evento y el campo de activo, y luego son guardados en userList.
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
            eventsList.push(event);
            localStorageService.set("eventsList", eventsList);
            eventId++;
            localStorageService.setId("eventIdCounter", eventId);
            result.value= true;
            result.eventId= event.id;
        };
        return result;
    };

    var replaceEvent= function(eventId, newEvent){
        var newEventList= removeOldEvent(eventId);
        console.log(newEvent);
        newEventList.push(newEvent);
        localStorageService.set("eventsList", newEventList);
    };   

    var removeOldEvent= function (eventId){
        eventsList = eventsList.filter(function (item) {
            return item.id !== eventId;
        });
        return eventsList;
    };

	return{
		//setCreditCard: setCreditCard,
		retrieveEvent: retrieveEvent,
        activeEvents:activeEvents,
        getEventTypeList:getEventTypeList,
        todayEvents:todayEvents,
        eventsByType:eventsByType,
        getEventType:getEventType,
        prueba:prueba,
        registerEvent:registerEvent,
        eventsList:eventsList,
        replaceEvent:replaceEvent
	};
}]);//end -service-