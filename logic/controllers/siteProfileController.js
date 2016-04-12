angular.module('OGTicketsApp.controllers')
.controller('siteProfileController', ['$scope', '$routeParams', 'siteService','$location', function ($scope, $routeParams, siteService,$location) {
	
	var siteId = $routeParams.siteId;

	// Sets on "currentSite" the whole event by the id
    $scope.currentSite = siteService.retrieveSite(siteId);
    

	//Envia al administrado al formulario de editar sitio
	$scope.editSite= function(){
        var siteId = $routeParams.siteId;
        $location.path('/site-profile-edit/'+siteId);
    };

    var map = document.querySelector('google-map');

    map.latitude = $scope.currentSite.latitude;
	map.longitude = $scope.currentSite.longitude;

}]); //end -controller-