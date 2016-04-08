angular.module('OGTicketsApp.services')
.service('eventService', ['localStorageService', function(localStorageService) {

	// Saves on "eventsList" all the events saved on the database, (active and inactive events.)
    var eventsList = localStorageService.getAll("eventsList");

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

    }


	return{
		//setCreditCard: setCreditCard,
		retrieveEvent: retrieveEvent,
        activeEvents:activeEvents,
        getEventTypeList:getEventTypeList,
        todayEvents:todayEvents,
        eventsByType:eventsByType,
        getEventType:getEventType
	};
}]);//end -service-