angular.module('OGTicketsApp.services')
.service('promotorService', ['localStorageService', function(localStorageService) {

	var promotors= localStorageService.getAll("userList");

	var promotorId= localStorageService.setIdCounter("promotorIdCounter", 4);

	var promotorExists= function (promotor) {
		var promotorExists= promotors.filter(function (item) {
			return item.email== promotor.email;
		});
		return promotorExists;
	}; 

    var promotorRegister= function (promotor) {
    	var saved= promotorExists(promotor);
    	var result={};

    	if(saved.length>0){
    		result.value=false;
    		result.msj="Promotor already exists";
    	}else{
    		promotor.id= "pr" + promotorId;
    		promotors.push(promotor);
    		localStorageService.set("userList", promotors);
    		promotorId++;
    		localStorageService.setId("promotorIdCounter", promotorId);
    		result.value= true;
    		result.promotorId= promotor.id;
    	};
    	return result;
    };

	return{
		promotorRegister:promotorRegister
	};

}]);