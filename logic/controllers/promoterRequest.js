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
			var jsonList= data.data;
			angular.forEach(jsonList, function(item) {
				if (item.firstname && item.secondname && item.secondlastname) {
					item.name = item.firstname + ' ' + item.secondname + ' ' + item.firstlastname + ' ' + item.secondlastname;
				}else if (item.firstname && item.secondname){
					item.name = item.firstname + ' ' + item.secondname + ' ' + item.firstlastname;
				}else if(item.firstname && item.secondlastname){
					item.name = item.firstname + ' ' + item.firstlastname + ' ' + item.secondlastname;
				}else if(item.firstname){
					item.name = item.firstname + ' ' + item.firstlastname;
				}
			});
			$scope.promPendingCheck= jsonList;
		})
		.catch(function(error) {
			console.log(error);
		})
	}

	$scope.resquestPromotor= function(){
		var promise= promotorService.promotorsPendingCheck();
		promise.then(function(data) {
			var jsonList= data.data;
       		$location.path('/promotor-signup-request/'+jsonList.idSolicitudRegistroPromotor);
       	})
    };
	
	$scope.init();

}]); //end -controller-


