angular.module('OGTicketsApp.services')
.service('cashierService', ['localStorageService', function(localStorageService) {

	var cashiers= localStorageService.getAll("userList");

	var cashierId= localStorageService.setIdCounter("cashierIdCounter", 4);

	var cashierExists= function (cashier) {
		var cashierExists= cashiers.filter(function (item) {
			return item.email== cashier.email;
		});
		return cashierExists;
	}; 

    var cashierRegister= function (cashier) {
    	var saved= cashierExists(cashier);
    	var result={};

    	if(saved.length>0){
    		result.value=false;
    		result.msj="Cashier already exists";
    	}else{
    		cashier.id= "cs" + cashierId;
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
		cashierRegister:cashierRegister
	};

}]);