angular.module('OGTicketsApp.services')
.service('siteService', ['localStorageService', 'eventService', function(localStorageService, eventService) {

	var sites= localStorageService.getAll("siteList");

	var siteId= localStorageService.setIdCounter("siteIdCounter", 4);

    //lista de  todos sitios activos
    var getSiteList= function () {
        var allSites= sites;
        result = allSites.filter(function (item) {
            return item.active == true;
        });
        return result;
    };

    //vefificar si el sitio existe
	var siteExists= function (site) {
		var siteExists= sites.filter(function (item) {
			return item.name== site.name;
		});
		return siteExists;
	}; 
    //registrar el sitio
    var registerSite= function (site) {
    	var saved= siteExists(site);
    	var result={};

    	if(saved.length>0){
    		result.value=false;
    		result.msj="Site already exists";
    	}else{
    		site.id= "si" + siteId;
    		sites.push(site);
    		localStorageService.set("siteList", sites);
    		siteId++;
    		localStorageService.setId("siteIdCounter", siteId);
    		result.value= true;
    		result.siteId= site.id;
    	};
    	return result;
    };
    //devulve una lista con los sitios activos
    var activeSites= function () {
        var result= sites.filter(function (item) {
            return item.active== true;
        });
        return result;
    }; 
    // devulelve el sitio en el que se va a realziar un evento.
    //params: eventId
    var getEventSite= function (eventId) {
        var event= eventService.retrieveEvent(eventId);
        var sites= activeSites();
        var eventSite= sites.filter(function (item) {
            return item.id== event.siteId;
        });
        return eventSite[0];
    };
   

    //retrieves site with the id given in the param
    var retrieveSite = function (sId){
        result = sites.filter(function (item) {
            return item.id == sId;
        });
        return result[0];
    };


// puntos de acceso
	return{
        getSiteList:getSiteList,
        sites:sites,
		registerSite:registerSite,
        getEventSite:getEventSite,
        retrieveSite:retrieveSite
	};
}]);