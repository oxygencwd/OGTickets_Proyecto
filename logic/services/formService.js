angular.module('OGTicketsApp.services')
.service('formService', function() {

	var clear= function ($scope, form) {
		if ($scope.form) {
                $scope.form.$setPristine();
                $scope.form.$setUntouched();
        }
	}; //fin function



//puntos de acceso de los metodos del servicio:
	return{
		clear:clear
	};
});//end -service-




