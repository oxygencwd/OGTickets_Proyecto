angular.module('OGTicketsApp.services')
.service('promotorService', ['localStorageService', function(localStorageService) {

    //Llama a todos los promotoes guardados en userList.
    var promotors= localStorageService.getAll("userList");

    //Llama a todos las solicitudes de promotor guardadas en promoterRegisterRequest.
	var promotorsResquest= localStorageService.getAll("promoterRegisterRequest");

    //Genera un contador de id.
	var promotorId= localStorageService.setIdCounter("promotorIdCounter", 4);

    //Revisa el email del promotor, para saber si ya existe o no una cuenta con ese email.
	var promotorExists= function (promotor) {
		var promotorExists= promotors.filter(function (item) {
			return item.email== promotor.email;
		});
		return promotorExists;
	}; 

    //Toma todos los datos del formulario, agrega el prefijo de promotor, el campo de activo y el tipo de usuario, y luego son guardados en userList.
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

    //Revisa el email del promotor que solicitara un registro, para saber si ya existe o no una cuenta con ese email.
    var promotorExistsRequest= function (promotor) {
        var promotorExistsRequest= promotors.filter(function (item) {
            return item.email== promotor.email;
        });
        return promotorExistsRequest;
    }; 

    //Toma todos los datos del formulario, agrega el campo de approved y el de pendingCheck, y luego son guardados en promotorsResquest.
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