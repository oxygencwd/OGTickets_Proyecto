angular.module('OGTicketsApp.controllers')
.controller('siteProfileController', ['$scope', '$routeParams', 'siteService', function ($scope, $routeParams, siteService) {
	
	var siteId = $routeParams.siteId;

	// Sets on "currentSite" the whole event by the id
    $scope.currentSite = siteService.retrieveSite(siteId);

console.log($scope.currentSite);
}]); //end -controller-