angular.module('OGTicketsApp.controllers')
.controller('promoterRequest', ['$scope', '$location', 'promotorService', function ($scope, $location, promotorService) {
	$scope.init = function (){
		$scope.url = $location.url();
		$scope.promReq = '/promoter-request';
		getRequest();
	};
	
	//$scope.promPendingCheck = promotorService.promotorsPendingCheck()
	function getRequest() {
		var promise= promotorService.promotorsPendingCheck();
		promise.then(function(data) {
			console.log(data);
			var jsonList= angular.toJson(data.data);
			console.log(jsonList);
			$scope.promPendingCheck= jsonList;
		})
		.catch(function(error) {
			console.log(error);
		})
	}
	

	$scope.init();

}]); //end -controller-