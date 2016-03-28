angular.module('OGTicketsApp.controllers')
.controller('siteRegistrationController', ['$scope', function ($scope) {
	
	$scope.addTransact= function () {
			var transacIds= BDService.getTransactCount();
			$scope.newTransat.id= transacIds;
			loggedUser.transac.push($scope.newTransat);
			BDService.updateTransactCount();
			$scope.msj= "Movimiento agregado con éxito";
			clearForm();
			BDService.updateLoggedUser();
			$scope.newTransat={};
			//$window.location.href = ('#/detail/' + $scope.userId+'/' + $scope.newTransat.id );
		};

	var	clearForm= function () {
		if ($scope.addTransactForm) {
               $scope.addTransactForm.$setPristine();
                $scope.addTransactForm.$setUntouched();
        }
	}; //fin function



}]); //end -controller-