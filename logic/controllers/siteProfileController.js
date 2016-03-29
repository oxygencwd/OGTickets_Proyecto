angular.module('OGTicketsApp.controllers')
.controller('siteProfileController', ['$scope','$routeParams','BDService', function ($scope,$routeParams,BDService) {
	
	var site = BDService.siteList;
	var transactId= Number($routeParams.trsId);
	$scope.userId= side.id;
	
	var objeto= angular.fromJson(site);
	
	objeto.getTransact= function () {
		return objeto.transac;
	};

	var transactList= objeto.getTransact();
	
	var getSelectedObject= function (pId) {
		var result= transactList.filter(function (item) {
			return item.id== pId;
		});
		return result;
	};

	$scope.transact=[];
	$scope.transact=(getSelectedObject(transactId));
	$scope.transact= $scope.transact[0];

}]); //end -controller-