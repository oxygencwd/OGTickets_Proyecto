angular.module('OGTicketsApp.services')
.service('eventService', ['localStorageService','userService','$q','$http', 'dateService', function(localStorageService, userService, $q, $http, dateService) {

	// Saves on "eventsList" all the events saved on the database, (active and inactive events.)
    //var eventsList = localStorageService.getAll("eventsList");

    //Genera un contador de id
    //var eventId= localStorageService.setIdCounter("eventIdCounter", 4);


    //active events= only active events can be display to clientes
    var activeEvents= function (){
        var defer= $q.defer();
        var url= 'back-end/index.php/events/getAllActiveEvents';

        $http.get(url)
        .success(function(data, status) {
           defer.resolve(data);
        })
        .error(function(error, status) {
            defer.reject(error);
            $log.error(error, status);
        });
        return defer.promise;

    };

    //retrieves the whole event object by its id
    //Param is the event id
    var getEventById = function (pId){
        var defer= $q.defer();
        var url= 'back-end/index.php/events/getEventById/' + pId;

        $http.get(url)
        .success(function(data, status) {
           defer.resolve(data);
        })
        .error(function(error, status) {
            defer.reject(error);
            $log.error(error, status);
        });
        return defer.promise;
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

    //solicita a la base de datos la lista de todos los tipos de eventos que estan activos
    var getEventTypeList= function () {
        var defer= $q.defer();
        var url= 'back-end/index.php/events/getAllEventTypes';

        $http.get(url)
        .success(function(data, status) {
           defer.resolve(data);
        })
        .error(function(error, status) {
            defer.reject(error);
            console.error(error, status);
        });
        return defer.promise;
    };

    //evento devuelve uj tipo de evento identificado por el id parametro
    var getEventType= function (typeId) {
        var typeList= getEventTypeList();
        result = typeList.filter(function (item) {
            return item.id == typeId;
        });
        return result[0];

    };

    //Revisa el nombre del evento que se va a registrar, para saber si ya existe o no.
    var eventExists= function (event) {
        var eventExists= eventsList.filter(function (item) {
            return item.name== event.name;
        });
        return eventExists;
    }; 

    //Toma todos los datos del formulario, y los envia al back-end, despues recibe la respues del back end la poesa y envia una promesa de respuesta al controller.
    /**
     * @param  event
     * @return promise
     */
    var registerEvent= function (event) {
        var objEvent= {
            "eventType": event.eventType,
            "siteId": event.siteId,
            "name": event.name,
            "description": event.description,
            "date": dateService.setDateTimeFormat(event.date),
            "startHour": dateService.setTimeFormat(event.startHour),
            "endHour": dateService.setTimeFormat(event.endHour),
            "ticketsPrice": event.ticketsPrice,
            "image": event.image,
        };
        
        var defer= $q.defer();
        var url= 'back-end/index.php/event/registerEvent';

        $http.post(url, objEvent)
        .success(function(data, status) {
        defer.resolve(data);
        })
        .error(function(error, status) {
        defer.reject(error);
        console.error(error, status);
        });

        return defer.promise;
    };

    var replaceEvent= function(eventId, newEvent){
        var newEventList= removeOldEvent(eventId);
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
		getEventById: getEventById,
        activeEvents:activeEvents,
        getEventTypeList:getEventTypeList,
        todayEvents:todayEvents,
        eventsByType:eventsByType,
        getEventType:getEventType,
        registerEvent:registerEvent,
        //eventsList:eventsList,
        replaceEvent:replaceEvent
	};
}]);//end -service-