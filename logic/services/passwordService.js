angular.module('OGTicketsApp.services')
.service('passwordService', [function() {

	function generatePassword() {
	    var length = 5,
	        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
	        retVal = "";
	    for (var i = 0, n = charset.length; i < length; ++i) {
	        retVal += charset.charAt(Math.floor(Math.random() * n));
	    }
	    return retVal;
	}
    


//puntos de acceso de los metodos del servicio:
	return{
		generatePassword:generatePassword
	};
}]);//end -service-