angular.module('OGTicketsApp.controllers')
.controller('siteRegistrationController', ['$scope','localStorageService','formService','siteService', '$location', function ($scope,localStorageService, formService, siteService, $location) {

	$scope.newSite={};
	$scope.error="";

	$scope.registerSite=function () {
		result= siteService.registerSite($scope.newSite);
		var siteId;
		if(result.value){
			siteId= result.siteId;
			$scope.newSite={};
			formService.clear($scope.formNewSite);
			$location.path('/site-profile/'+siteId);
			$scope.error="";
		}else{
			$scope.error="El sitio ya existe";
		}
	}; 

	$scope.expCapacity = /^[\ |0-9]{1,5}$/;
	$scope.expDecimalLatitude = /^-?\d{0,2}(?:,\s?\d{3})*(?:\.\d*)?$/;
	$scope.expDecimalLongitude = /^-?\d{0,3}(?:,\s?\d{3})*(?:\.\d*)?$/;
	
}]);