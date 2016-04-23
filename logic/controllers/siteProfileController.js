angular.module('OGTicketsApp.controllers')
.controller('siteProfileController', ['$scope', '$routeParams', 'siteService','$location', function ($scope, $routeParams, siteService,$location) {
	
	$scope.init = function (){
    	//getSiteList();
    	//$scope.currentSite={};
    }

	var siteId = $routeParams.siteId;

	var promise=siteService.getSiteById(siteId);
	promise.then(function(data) {
		$scope.currentSite= data.data[0];
	})
	.then(function() {
		var map = document.querySelector('google-map');
		map.latitude = $scope.currentSite.latitude;
		map.longitude = $scope.currentSite.longitude;
	})
	.catch(function(error) {
		console.error(error);
	});

	// Sets on "currentSite" the whole event by the id
   // $scope.currentSite = retrieveSite(siteId);
    
	//Envia al administrado al formulario de editar sitio
	$scope.editSite= function(){
        $location.path('/site-profile-edit/'+siteId);
    };

    

    




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