angular.module('OGTicketsApp.controllers')
.controller('siteRegistrationController', ['$scope', function ($scope) {


	$scope.newSite={};

	$scope.addTransact= function () {
			var transacIds= BDService.getTransactCount();
			$scope.newSite.id= transacIds;
			loggedUser.transac.push($scope.newSite);
			BDService.updateTransactCount();
			$scope.msj= "Sitio creado";
			clearForm();
			BDService.updateLoggedUser();
			$scope.newSite={};
			//$window.location.href = ('#/detail/' + $scope.userId+'/' + $scope.newSite.id );
		};

	$scope.expNumberPhone = /^[\ |0-9]{8}$/;
	$scope.expDecimalLatitud = /^-?\d{0,2}(?:,\s?\d{3})*(?:\.\d*)?$/;
	$scope.expDecimalLongitud = /^-?\d{0,3}(?:,\s?\d{3})*(?:\.\d*)?$/;

	var	clearForm= function () {
		if ($scope.addTransactForm) {
               $scope.addTransactForm.$setPristine();
                $scope.addTransactForm.$setUntouched();
        }
	}; //fin function

}]); //end -controller-
