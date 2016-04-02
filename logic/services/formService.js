angular.module('OGTicketsApp.services')
.service('formService', function() {

	var clear= function (form) {
        form.$setPristine();
        form.$setUntouched();
	}; //fin function



//puntos de acceso de los metodos del servicio:
	return{
		clear:clear
	};
});//end -service-


