angular.module('OGTicketsApp.services')
.service('clientService', ['localStorageService', function(localStorageService) {

	var clients= localStorageService.getAll("userList");

	var clientId= localStorageService.setIdCounter("clientIdCounter", 4);

	var clientExists= function (client) {
		var clientExists= clients.filter(function (item) {
			return item.email== client.email;
		});
		return clientExists;
	}; 

    var clientRegister= function (client) {
    	var saved= clientExists(client);
    	var result={};

    	if(saved.length>0){
    		result.value=false;
    		result.msj="Client already exists";
    	}else{
    		client.id= "cl" + clientId;
            client.userType= "ut02";
    		clients.push(client);
    		localStorageService.set("userList", clients);
    		clientId++;
            console.log(client.id);
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