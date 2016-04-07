angular.module('OGTicketsApp.controllers')
.controller('allSitesController', ['$scope', '$location', function ($scope, $location) {
	
$scope.url = $location.url();
$scope.allSites = '/all-sites';


}]); //end -controller-