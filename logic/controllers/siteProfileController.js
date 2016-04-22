angular.module('OGTicketsApp.controllers')
.controller('siteProfileController', ['$scope', '$routeParams', 'siteService','$location', function ($scope, $routeParams, siteService,$location) {
	
	$scope.init = function (){
    	getSiteList();
    }

	var siteId = $routeParams.siteId;

	// Sets on "currentSite" the whole event by the id
    $scope.currentSite = retrieveSite(siteId);
    
	//Envia al administrado al formulario de editar sitio
	$scope.editSite= function(){
        $location.path('/site-profile-edit/'+siteId);
    };

    var map = document.querySelector('google-map');

    map.latitude = $scope.currentSite.latitude;
	map.longitude = $scope.currentSite.longitude;




	//retrieves site with the id given in the param
    var retrieveSite = function (sId){
        result = siteList.filter(function (item) {
            return item.id == sId;
        });
        return result[0];
    };



	var getSiteList = function (){
		var promise = siteService.getSiteList();
		promise.then(function (data){
			var siteList = data.data;
		})
		.catch(function(error){
			console.log(error);
		})
	}

	$scope.init();

}]); //end -controller-