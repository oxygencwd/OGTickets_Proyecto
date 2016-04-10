angular.module('OGTicketsApp.controllers')
.controller('siteProfileController', ['$scope', '$routeParams', 'siteService', function ($scope, $routeParams, siteService) {
	
	var siteId = $routeParams.siteId;

	// Sets on "currentSite" the whole event by the id
    $scope.currentSite = siteService.retrieveSite(siteId);
    
    var map = document.querySelector('google-map');

    map.latitude = $scope.currentSite.latitude;
	map.longitude = $scope.currentSite.longitude;

}]); //end -controller-