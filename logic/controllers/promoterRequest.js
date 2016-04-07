angular.module('OGTicketsApp.controllers')
.controller('promoterRequest', ['$scope', '$location', function ($scope, $location) {
	
$scope.url = $location.url();
$scope.promReq = '/promoter-request';

}]); //end -controller-