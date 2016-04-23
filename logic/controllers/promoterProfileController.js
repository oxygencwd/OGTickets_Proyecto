angular.module('OGTicketsApp.controllers')
.controller('promoterProfileController', ['$scope', '$routeParams', '$location', 'promotorService', 'siteService','userService', function ($scope, $routeParams, $location, promotorService, siteService,userService){

	var promoterId = $routeParams.promoterId;

	//Envia al cliente al formulario de editar datos
	$scope.editPromotor= function(){
        $location.path('/promoter-profile-edit/'+promoterId);
    };

    var sites = siteService.sites;

    $scope.events = function(){
    	var events=promotorService.getPromotorEvents(promoterId);
		angular.forEach(sites, function(item1) {
			angular.forEach(events, function(item2) {
				if(item1.id == item2.siteId) {
				item2.siteId = item1.name;
				}
			});
		});

		return events;
    };

    $scope.retrievePromotor = function (){
    	var promise = promotorService.retrievePromotor(promoterId);
		promise.then(function(data) {
			$scope.currentPromotor= data.data[0];
			$scope.currentPromotor.name = userService.parseName(currentPromotor);
		})
		.catch(function(error) {
			console.log(error);
		})
    };

    $scope.eventToDisplay = null; 

    $scope.retrievePromotor();

}]); //end -controller-