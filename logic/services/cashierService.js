angular.module('OGTicketsApp.services')
.service('cashierService', ['localStorageService', 'passwordService', 'dateService', '$q', '$http',function(localStorageService, passwordService, dateService, $q, $http) {

    //Llama a todos los cajeros guardados en userList.
	var cashiers= localStorageService.getAll("userList");

    //Genera un contador de id
	var cashierId= localStorageService.setIdCounter("cashierIdCounter", 4);

    //Revisa el email del cajero que se va a registrar, para saber si ya existe o no.
	var cashierExists= function (cashier) {
		var cashierExists= cashiers.filter(function (item) {
			return item.email== cashier.email;
		});
		return cashierExists;
	}; 

    /*realiza las operaciones de registro de cajero*/
    /*
        newCashier={
            firstname**,
            secondname
            firstlastname*,
            secondlastname,
            personalId*,
            email*,
            
            dateBirth*,
            phone*,
            genre*
        }
    */
    /**
     * @param  obj objCashier
     * @return promise.
     */
    var cashierRegister= function (objCashier) {
        var objCashierInfo= {
            "dateBirth": dateService.setDateTimeFormat(objCashier.dateBirth),
            "phone": objCashier.phone,
            "genre": objCashier.genre
        };
        var password= passwordService.generatePassword();
        var id;
        var defer= $q.defer();
        
        validateCashierInfo(objCashier)
        .then(function(data) {
            if(data.valid){
                validateUserInfo(objCashier, password)
                .then(function(data) {
                    if(data.created){
                        id= data.meta;
                        var url= 'back-end/index.php/cashier/registerCashier/' + id;
                        console.info("url=" + url);
                        $http.post(url, objCashierInfo)
                        .success(function(data, status) {
                            defer.resolve(data);
                            data.password= password;
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
     * Envia la información correspondiente a la tabla de cajero a validar.
     * @param  obj objUser
     * @return promise
     */
    var validateCashierInfo= function(objCashier) {
        var objCashierInfo= {
            "dateBirth": dateService.setDateTimeFormat(objCashier.dateBirth),
            "phone": objCashier.phone,
            "genre": objCashier.genre
        };

        var defer= $q.defer();
        var url= 'back-end/index.php/cashier/validateCahierInfo';

        $http.post(url, objCashierInfo)
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
    var validateUserInfo= function(objUser, password) {
        var objUserInfo={
            "firstname": objUser.firstname,
            "secondname": objUser.secondname,        
            "firstlastname": objUser.firstlastname,
            "secondlastname": objUser.secondlastname,
            "personalId": objUser.personalId,
            "email": objUser.email,
            "password": password,
            "repeatPass": password,
            "userType": 4
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

	return{
		cashierRegister:cashierRegister
	};

}]);