angular.module('OGTicketsApp.services')
.service('clientService', ['$log', '$http', '$q', 'localStorageService', 'dateService' ,function($log, $http, $q, localStorageService, dateService) {

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

    /**
     * @param  obj objClient
     * @return promise.
     */
    var clientRegister= function (objClient) {
        var objClientInfo= {
            "dateBirth": dateService.setDateTimeFormat(objClient.dateBirth),
            "phone": objClient.phone,
            "genre": objClient.genre,
            "picture": objClient.picture
        };
        var id;
        var defer= $q.defer();
        
        validateClientInfo(objClient)
        .then(function(data) {
            if(data.valid){
                validateUserInfo(objClient)
                .then(function(data) {
                    if(data.created){
                        id= data.meta;
                        var url= 'back-end/index.php/client/registerClient/' + id;
                        console.info("url=" + url);
                        $http.post(url, objClientInfo)
                        .success(function(data, status) {
                            defer.resolve(data);
                        })
                            .error(function(error, status) {
                            defer.reject(error);
                            console.error(error, status);
                        });
                    }else{
                        console.error("Datos usuario invalidos");
                        return "Datos del usuario inválidos"
                    }
                })
                .catch(function(error) {
                    console.error(error);
                    console.error("Error Registrando el usuario.");
                })
            }else{
                console.error("Datos cliente inválidos");
                return "Datos de Cliente inválidos";
            }
        })
        .catch(function(error) {
            console.error(error);
            console.error("Error Registrando el cliente.");
        })
        
        return defer.promise;    
    };

    /**
     * Envia la información correspondiente a la tabla de cliente a validar.
     * @param  obj objClient
     * @return promise
     */
    var validateClientInfo= function(objClient) {
        var objClientInfo= {
            "dateBirth": dateService.setDateTimeFormat(objClient.dateBirth),
            "phone": objClient.phone,
            "genre": objClient.genre
        };

        var defer= $q.defer();
        var url= 'back-end/index.php/client/validateClientInfo';

        $http.post(url, objClientInfo)
        .success(function(data, status) {
            defer.resolve(data);
        })
            .error(function(error, status) {
            defer.reject(error);
            console.error(error, status);
        });

        return defer.promise;
    };


    /**
     * Envia la información correspondiente a la tabla de usuario a validar, si la informacion es valida guarda el usuario
     * @param  obj objUser
     * @return promise
     */
    var validateUserInfo= function(objUser) {
        var objUserInfo={
            "firstname": objUser.firstname,
            "secondname": objUser.secondname,        
            "firstlastname": objUser.firstlastname,
            "secondlastname": objUser.secondlastname,
            "personalId": objUser.personalId,
            "email": objUser.email,
            "password": objUser.password,
            "repeatPass": objUser.repeatPass,
            "userType": 2
        };

        var defer= $q.defer();
        var url= 'back-end/index.php/user/registerUser';

        $http.post(url, objUserInfo)
        .success(function (data, status) {
            defer.resolve(data);
        })
        .error(function(error) {
            defer.reject(error);
            console.error(error);
        })

        return defer.promise;

    };

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