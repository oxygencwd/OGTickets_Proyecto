angular.module('OGTicketsApp.controllers')
.controller('siteRegistrationController', ['$scope','localStorageService','$routeParams'/*,'serviceSiteRegister'*/, function ($scope,localStorageService,$routeParams/*,serviceSiteRegister*/) {

	$scope.sites= localStorageService.getAll();

	$scope.newSite={};

	$scope.siteExists= function () {
		$scope.exists= localStorageService.getAll().filter(function (item) {
			return item.nameSite== $scope.newSite.nameSite;
		});
		return $scope.exists;
	}; 

	$scope.registreSite= function () {
		var exists= $scope.siteExists();
		if(exists.length==0){
			$scope.addSite();
			$scope.clearForm();
			$scope.siteError= "Nuevo sitio registrado.";
		}else{
			$scope.siteError= "El sitio {{newSite.nameSite}} ya existe.";
		}
	};
		
	$scope.addSite= function () {
		serviceSiteRegister.saveSite($scope.newSite);
		$scope.newSite={};
		$scope.clearForm();
	};

	$scope.clearForm= function () {
		if ($scope.siteRegistration) {
            $scope.siteRegistration.$setPristine();
            $scope.siteRegistration.$setUntouched();
        }
	};

	$scope.siteId= Number($routeParams.id);

	$scope.expNumberPhone = /^[\ |0-9]{8}$/;
	$scope.expDecimalLatitud = /^-?\d{0,2}(?:,\s?\d{3})*(?:\.\d*)?$/;
	$scope.expDecimalLongitud = /^-?\d{0,3}(?:,\s?\d{3})*(?:\.\d*)?$/;
}]);
