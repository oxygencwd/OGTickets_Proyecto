angular.module('OGTicketsApp.services')
.service('siteService', ['localStorageService', function(localStorageService) {

	var sites= localStorageService.getAll("siteList");

	var siteId= localStorageService.setIdCounter("siteIdCounter", 4);

	var siteExists= function (site) {
		var siteExists= sites.filter(function (item) {
			return item.name== site.name;
		});
		return siteExists;
	}; 

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

	return{
		registerSite:registerSite
	};
}]);