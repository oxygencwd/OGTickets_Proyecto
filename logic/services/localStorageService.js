angular.module('OGTicketsApp.services')
.service('localStorageService', function() {
	
	//guardar un objeto en el local storage
    var set = function(key, object) {
        localStorage.setItem(key, angular.toJson(object));
    };

    //obtener un objeto en del local storage
    var getAll = function(key) {
        return angular.fromJson(localStorage.getItem(key));
    };

    //eliminar un objeto en el local storage
    var remove = function(key) {
        localStorage.removeItem(key);
    };

    //revisa si el objeto "key" esta inicializado en el local storage, si esta inicializado devuelve su contenido y si no lo esta lo inicializa
    var setIf= function(key) {
    	return angular.fromJson(localStorage.getItem(key)) || [];	
    };


    //actualiza la coleccion "key" en el local storage
    var watchCollection = function(key, $scope) {
        $scope.$watchCollection(key, function() {
            localStorage.setItem(key, JSON.stringify($scope.key));
        });
    };


//puntos de acceso de los metodos del servicio:
	return{
		set: set,
		getAll: getAll,
		remove: remove,
		setIf:setIf,
        watchCollection: watchCollection
	}
});
