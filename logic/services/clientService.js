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

    //Toma los datos del formulario, que deben almacenarse en la tabla usuario y los envía la back-end, despues recibe la respuesta con la promesa desde el back-end y la envía de vuelta a el controlador.
    /*
            newClient={
                firstname**,
                secondname
                firstlastname*,
                secondlastname,
                personalId*,
                email*,
                password*,
                    repeatPass*,

                dateBirth*,
                phone*,
                genre*,
                disability,
                picture
            }
    */
    var clientRegister= function (objClient) {
        var newClient= {
            "dateBirth": objClient.dateBirth,
            "phone": objClient.phone,
            "genre": objClient.genre
        };

        var newUser={
            "firstname": objClient.firstname,
            "secondname": objClient.secondname,        
            "firstlastname": objClient.firstlastname,
            "secondlastname": objClient.secondlastname,
            "personalId": objClient.personalId,
            "email": objClient.email,
            "password": objClient.password,
            "repeatPass": objClient.repeatPass,
            "userType": 2
        };


      


        validateClientInfo(newClient)
        .then(function(data) {
            console.log(data);
        })
        .catch(function(error) {
            console.log(error);
            console.error("error en las vefifiaciones de cliente");
        });



        // var defer= $q.defer();
        // var url= 'back-end/index.php/user/registerUser';

        // $http.post(url, newUser)
        // .success(function(response) {
        //     defer.resolve(response);
        //     console.info("success");
        // })
        // .error(function(error) {
        //  defer.reject(error);
        //     $log.error(error, status);
        // });
        // return defer.promise;
    };

 

    var validateClientInfo= function(objClientInfo) {
        var defer= $q.defer();
        var url= 'back-end/index.php/client/validateClientInfo';

        $http.post(url, objClientInfo)
        .success(function(response) {
            defer.resolve(response);
        })
        .error(function(error) {
            defer.reject(error);
            console.error(error);
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