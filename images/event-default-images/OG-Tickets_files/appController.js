angular.module('OGTicketsApp.controllers')
.controller('appController', ['$scope', 'BDService', 'userService', function ($scope, BDService, userService) {

	$scope.appLoggedUser={
		name:"", id:"", userType:"", isConnected:false
	};

	$scope.isLoggedIn= userService.isLoggedIn($scope.appLoggedUser);
	$scope.expNumberPhone = /^[\ |0-9]{8}$/;

//estos son los datos que se queman al local storage cuando uno abre la app//
	var userList= BDService.userList();
	var siteList= BDService.siteList();
	var eventsList= BDService.eventsList();
	var transactionList= BDService.transactionList();
	var eventTypeList= BDService.eventTypeList();
	var promoterRegisterRequest= BDService.promoterRegisterRequest();
	var reservedSeatxEventxSite= BDService.reservedSeatxEventxSite();
// fin de los datos quemados

}]); //end -controller-
