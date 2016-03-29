angular.module('OGTicketsApp.controllers')
.controller('siteProfileController', ['$scope','$routeParams','localStorageService', function ($scope,$routeParams,localStorageService) {
	
	var sites = localStorageService.siteList;

	var sideId= Number($routeParams.sideId);
	$scope.siteId= sites.id;
	
	var objeto= angular.fromJson(sites);
	
	objeto.getSite= function () {
		return objeto.site;
	};

	var transactList= objeto.getSite();
	
	var getSelectedObject= function (pId) {
		var result= transactList.filter(function (item) {
			return item.id== pId;
		});
		return result;
	};

	$scope.site=[];
	$scope.site=(getSelectedObject(sideId));
	$scope.site= $scope.site[0];

}]); //end -controller-