angular.module('OGTicketsApp.controllers')
.controller('appController', ['$scope', 'localStorageService', 'BDService', 'userService', function ($scope, localStorageService, BDService, userService) {

	$scope.init= function () {
		$scope.appLoggedUser={
			name:"", userId:"", userType:"", isConnected:false
		};

		isLoggedIn();
	};

	var currentUser= localStorageService.getAll("loggedUser");

	function isLoggedIn() {
		if(userService.isLoggedIn()){
			userService.login($scope.appLoggedUser, currentUser);
		}
	}



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


	$scope.init();

}]); //end -controller-

