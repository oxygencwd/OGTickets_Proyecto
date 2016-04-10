angular.module('OGTicketsApp.services')
.service('clientService', ['localStorageService', function(localStorageService) {

    //Llama a todos los clientes guardados en userList.
	var clients= localStorageService.getAll("userList");

    //Genera un contador de id
	var clientId= localStorageService.setIdCounter("clientIdCounter", 4);

    //Revisa el email del cliente que se va a registrar, para saber si ya existe o no.
	var clientExists= function (client) {
		var clientExists= clients.filter(function (item) {
			return item.email== client.email;
		});
		return clientExists;
	}; 

    //Toma todos los datos del formulario, agrega el prefijo de cliente, el campo de activo y el tipo de usuario, y luego son guardados en userList.
    var clientRegister= function (client) {
    	var saved= clientExists(client);
    	var result={};

    	if(saved.length>0){
    		result.value=false;
    		result.msj="Client already exists";
    	}else{
    		client.id= "cl" + clientId;
            client.active= true;
            client.userType= "ut02";
    		clients.push(client);
    		localStorageService.set("userList", clients);
    		clientId++;
    		localStorageService.setId("clientIdCounter", clientId);
    		result.value= true;
    		result.clientId= client.id;
    	};
    	return result;
    };

	return{
		clientRegister:clientRegister
	};
}]);