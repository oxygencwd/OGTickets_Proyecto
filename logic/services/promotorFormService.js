angular.module('OGTicketsApp.services')
.service('promotorFormService', ['localStorageService', function(localStorageService) {

    var promotors= localStorageService.getAll("userList");

	var promotorsResquest= localStorageService.getAll("promoterRegisterRequest");

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
            promotor.active= true;
            promotor.userType= "ut03";
    		promotors.push(promotor);
    		localStorageService.set("userList", promotors);
    		promotorId++;
    		localStorageService.setId("promotorIdCounter", promotorId);
    		result.value= true;
    		result.promotorId= promotor.id;
    	};
    	return result;
    };

    var promotorExistsRequest= function (promotor) {
        var promotorExistsRequest= promotors.filter(function (item) {
            return item.email== promotor.email;
        });
        return promotorExistsRequest;
    }; 

    var promotorRequest= function (promotor) {
      var saved= promotorExistsRequest(promotor);
        var result={};

        if(saved.length>0){
            result.value=false;
            result.msj="Promotor already exists";
        }else{
            promotor.approved= false;
            promotor.pendingCheck= true;
            promotorsResquest.push(promotor);
            localStorageService.set("promoterRegisterRequest", promotorsResquest);
            result.value= true;
        };
        return result;
    }

	return{
		promotorRegister:promotorRegister,
        promotorRequest:promotorRequest
	};

}]);