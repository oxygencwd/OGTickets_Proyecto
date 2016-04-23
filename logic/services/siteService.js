angular.module('OGTicketsApp.services')
.service('siteService', ['localStorageService', '$q', '$http', 'eventService', function(localStorageService, $q, $http, eventService) {

	var sites= localStorageService.getAll("siteList");

	//var siteId= localStorageService.setIdCounter("siteIdCounter", 4);

    //lista de  todos sitios activos
    var getSiteList= function () {
        var defer= $q.defer();
        var url= 'back-end/index.php/sites/getSiteList';

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


    var getSiteById= function(pId) {
        var defer= $q.defer();
        var url= 'back-end/index.php/sites/getSiteById/' + pId;

        $http.get(url)
        .success(function(data, status) {
           defer.resolve(data);
        })
        .error(function(error, status) {
            defer.reject(error);
            $log.error(error, status);
        });
        return defer.promise;
    }

    //vefificar si el sitio existe
	var siteExists= function (site) {
		var siteExists= sites.filter(function (item) {
			return item.name== site.name;
		});
		return siteExists;
	}; 
    //registrar el sitio
    var registerSite= function (site) {
    	var defer= $q.defer();
        var url= 'back-end/index.php/sites/registerSite';

        $http.post(url, site)
        .success(function(data, status) {
            // console.info(data);
            defer.resolve(data);
        })
        .error(function(error, status) {
            // console.info(error);
            defer.reject(error);
            $log.error(error, status);
        });

        return defer.promise;
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


    var replaceSite= function(siteId, newSite){
        var newSiteList= removeOldSite(siteId);
        newSiteList.push(newSite);
        localStorageService.set("siteList", newSiteList);
    };   

    var removeOldSite= function (siteId){
        siteList = sites.filter(function (item) {
            return item.id !== siteId;
        });
        return siteList;
    };


// puntos de acceso
	return{
        getSiteList:getSiteList,
        getSiteById:getSiteById,
		registerSite:registerSite,
        getEventSite:getEventSite,
        retrieveSite:retrieveSite,
        replaceSite:replaceSite,
        removeOldSite:removeOldSite
	};
}]);