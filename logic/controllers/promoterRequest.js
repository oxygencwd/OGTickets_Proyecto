angular.module('OGTicketsApp.controllers')
.controller('promoterRequest', ['$scope', '$location', 'promotorService', function ($scope, $location, promotorService) {
	$scope.init = function (){
		$scope.url = $location.url();
		$scope.promReq = '/promoter-request';
	};
	
	$scope.promPendingCheck = promotorService.promotorsPendingCheck();

	$scope.init();

}]); //end -controller-