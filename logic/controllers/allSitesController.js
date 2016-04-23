angular.module('OGTicketsApp.controllers')
.controller('allSitesController', ['$scope', '$location', 'siteService', function ($scope, $location, siteService) {
	$scope.init = function (){
		$scope.url = $location.url();
		$scope.allSites = '/all-sites';
		getActiveSites();
	};

	var getActiveSites = function (){
		var promise = siteService.getSiteList();
		promise.then(function(data) {
			$scope.sitesList= data.data;
			console.log($scope.sitesList);
		})
		.catch(function(error) {
			console.log(error);
		})
	};

	$scope.init();

}]); //end -controller-