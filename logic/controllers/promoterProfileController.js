angular.module('OGTicketsApp.controllers')
.controller('promoterProfileController', ['$scope', '$routeParams', '$location', 'promotorService', 'siteService','userService', function ($scope, $routeParams, $location, promotorService, siteService,userService){

	var promoterId = $routeParams.promoterId;

	//Envia al cliente al formulario de editar datos
	$scope.editPromotor= function(){
        $location.path('/promoter-profile-edit/'+promoterId);
    };

    var sites = siteService.sites;

    

    $scope.retrievePromotor = function (){
    	var promise = promotorService.retrievePromotor(promoterId);
		promise.then(function(data) {
			$scope.currentPromotor= data.data[0];
			if(!$scope.currentPromotor.name){
				if ($scope.currentPromotor.firstname && $scope.currentPromotor.secondname && $scope.currentPromotor.secondlastname) {
					$scope.currentPromotor.name = $scope.currentPromotor.firstname + ' ' + $scope.currentPromotor.secondname + ' ' + $scope.currentPromotor.firstlastname + ' ' + $scope.currentPromotor.secondlastname;
				}else if ($scope.currentPromotor.firstname && $scope.currentPromotor.secondname){
					$scope.currentPromotor.name = $scope.currentPromotor.firstname + ' ' + $scope.currentPromotor.secondname + ' ' + $scope.currentPromotor.firstlastname;
				}else if($scope.currentPromotor.firstname && $scope.currentPromotor.secondlastname){
					$scope.currentPromotor.name = $scope.currentPromotor.firstname + ' ' + $scope.currentPromotor.firstlastname + ' ' + $scope.currentPromotor.secondlastname;
				}else if($scope.currentPromotor.firstname){
					$scope.currentPromotor.name = $scope.currentPromotor.firstname + ' ' + $scope.currentPromotor.firstlastname;
				}
			}
			$scope.events = data.data;

		})
		.catch(function(error) {
			console.log(error);
		})
    };

    $scope.eventToDisplay = null; 

    $scope.retrievePromotor();

}]); //end -controller-