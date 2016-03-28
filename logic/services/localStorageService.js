angular.module('OGTicketsApp.services')
.service('localStorageService', function() {
	
	//guardar un objeto en el local storage
    var set = function(key, object) {
        localStorage.setItem(key, angular.toJson(object));
    };

    //obtener un objeto en del local storage
    var get = function(key) {
        return angular.fromJson(localStorage.getItem(key));
    };

    //eliminar un objeto en el local storage
    var remove = function(key) {
        localStorage.removeItem(key);
    };

    var setIf= function(key) {
    		
    };


//puntos de acceso de los metodos del servicio:
	return{
		set: set,
		get: get,
		remove: remove,
		setIf:setIf
	}
});
