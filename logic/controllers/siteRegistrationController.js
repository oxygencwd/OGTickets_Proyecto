angular.module('OGTicketsApp.controllers')
.controller('siteRegistrationController', ['$scope','localStorageService','formService','siteService', '$location','$routeParams','$timeout', function ($scope,localStorageService, formService, siteService, $location,$routeParams,$timeout) {

	$scope.newSite={};
	$scope.error="";
	$scope.success="";

	var picture = '';

//Saves on src the url generated for the picture

	$scope.savePicture=function(src){
		picture = src;
	};

//Funcion del boton de registro de evento, agarra todos los datos del formulario.
	$scope.registerSite=function () {
		$scope.newSite.image = picture;
		siteService.registerSite($scope.newSite)
		.then(function(data) {
			if(data.valid){
				$scope.newSite={};
				formService.clear($scope.formNewSite);
				$timeout(function() {
					$scope.openModal("#siteRegSuccessModal");
					$scope.error="";
					$scope.success= "Sitio creado con éxito";
				}, 1500);	
			}else{
				$scope.error="Ya existe un sitio con ese nombre";
			}
		})
		.catch(function() {
			console.log("Error registrando el nuevo sitio");
		});
	}; 

	$scope.openModal= function (modalId) { 
	  $(modalId).modal('show');
	};

	$scope.goProfile= function() {
		$window.location.href = ('#/site-profile/'+newSite.idSitio);
	};

//Editar sitio.
	var siteId= $routeParams.siteId;
	var currentSite= siteService.retrieveSite(siteId);
	$scope.newSite= currentSite;
	

	if(siteId==undefined){
		$scope.editing= false;
	}else{
		$scope.editing= true;
	};

	$scope.editSite=function(){
		siteService.replaceSite(siteId, $scope.newSite);
		$scope.newSite={};
		formService.clear($scope.formNewSite);
		$window.location.href = ('#/site-profile/'+siteId);
	};

//Expresiones regulares, para validad campos de formulario
	$scope.expCapacity = /^[\ |0-9]{1,5}$/;
	$scope.expDecimalLatitude = /^-?\d{0,2}(?:,\s?\d{3})*(?:\.\d*)?$/;
	$scope.expDecimalLongitude = /^-?\d{0,3}(?:,\s?\d{3})*(?:\.\d*)?$/;
	
}]);