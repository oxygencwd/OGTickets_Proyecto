angular.module('OGTicketsApp.controllers')
.controller('appController', ['$scope', 'BDService', function ($scope, BDService) {

	$scope.appLoggedUser={
		name:"", id:"", userType:"", isConnected:false
	};



//estos son los datos que se queman al local storage cuando uno abre la app//
	var clientList= BDService.clientList();
	var promoterList= BDService.promoterList();
	var cashierList= BDService.cashierList();
	var siteList= BDService.siteList();
	var eventsList= BDService.eventsList();
	var transactionList= BDService.transactionList();
	var adminList= BDService.adminList();
	var eventTypeList= BDService.eventTypeList();
	var promoterRegisterRequest= BDService.promoterRegisterRequest();
// fin de los datos quemados

}]); //end -controller-

