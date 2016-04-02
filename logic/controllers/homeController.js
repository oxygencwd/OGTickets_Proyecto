angular.module('OGTicketsApp.controllers')
.controller('homeController', ['$scope', function ($scope) {
	

	$scope.expNumberPhone = /^[\ |0-9]{8}$/;
	$scope.expDecimalLatitud = /^-?\d{0,2}(?:,\s?\d{3})*(?:\.\d*)?$/;
	$scope.expDecimalLongitud = /^-?\d{0,3}(?:,\s?\d{3})*(?:\.\d*)?$/;
}]); //end -controller-