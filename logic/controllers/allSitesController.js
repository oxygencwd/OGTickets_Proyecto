angular.module('OGTicketsApp.controllers')
.controller('allSitesController', ['$scope', '$location', 'siteService', function ($scope, $location, siteService) {
	$scope.init = function (){
		$scope.url = $location.url();
		$scope.allSites = '/all-sites';
	};


	$scope.sitesList = siteService.sites;

	$scope.init();

}]); //end -controller-