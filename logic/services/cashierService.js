angular.module('OGTicketsApp.services')
.service('cashierFormService', ['localStorageService', function(localStorageService) {

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

    //Toma todos los datos del formulario, agrega el prefijo de cajero, el campo de activo y el tipo de usuario, y luego son guardados en userList.
    var cashierRegister= function (cashier) {
    	var saved= cashierExists(cashier);
    	var result={};

    	if(saved.length>0){
    		result.value=false;
    		result.msj="Cashier already exists";
    	}else{
    		cashier.id= "cs" + cashierId;
            cashier.active= true;
            client.userType= "ut04";
    		cashiers.push(cashier);
    		localStorageService.set("userList", cashiers);
    		cashierId++;
    		localStorageService.setId("cashierIdCounter", cashierId);
    		result.value= true;
    		result.cashierId= cashier.id;
    	};
    	return result;
    };

	return{
		
	};

}]);