angular.module('OGTicketsApp.services')
.service('clientService', ['$log', '$http', '$q', 'localStorageService', function($log, $http, $q, localStorageService) {

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

    //Toma todos los datos del formulario, y los envía la back-end, despues recibe la respuesta con la promesa desde el back-end y la envía de vuelta a el controlador.
    var clientRegister= function (client) {
        var defer= $q.defer;
        var url= 'back-end/index.php/user/register';

        $http.post(url, client)
        .success(function(data) {
            defer.resolve(data);
            console.info(data, "success");
        })
        .error(function() {
         defer.reject(error, status);
            $log.error(error, status);
        });
        return defer.promise;
    };




    // var clientRegister= function (client) {
    // 	var saved= clientExists(client);
    // 	var result={};

    // 	if(saved.length>0){
    // 		result.value=false;
    // 		result.msj="Client already exists";
    // 	}else{
    // 		client.id= "cl" + clientId;
    //         client.active= true;
    //         client.userType= "ut02";
    // 		clients.push(client);
    // 		localStorageService.set("userList", clients);
    // 		clientId++;
    // 		localStorageService.setId("clientIdCounter", clientId);
    // 		result.value= true;
    // 		result.clientId= client.id;
    // 	};
    // 	return result;
    // };

    var retrieveClient = function (cId){
        result = clients.filter(function (item) {
            return item.id == cId;
        });
        return result[0];
    };

    var replaceClient= function(clientId, newClient){
        var newClientList= removeOldClient(clientId);
        newClientList.push(newClient);
        localStorageService.set("userList", newClientList);
    };   

    var removeOldClient= function (clientId){
        userList = clients.filter(function (item) {
            return item.id !== clientId;
        });
        return userList;
    };

	return{
		clientRegister:clientRegister,
        retrieveClient:retrieveClient,
        replaceClient:replaceClient,
        removeOldClient:removeOldClient
	};
}]);