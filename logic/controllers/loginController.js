angular.module('OGTicketsApp.controllers')
.controller('loginController', ['$scope','$window','$routeParams',/*'serviceLogin',*/ 'localStorageService', function ($scope,$window,$routeParams,/*serviceLogin,*/localStorageService) {

	$scope.userCounts= localStorageService.getAll();

	$scope.accountExists= function () {
		$scope.exists= localStorageService.getAll().filter(function (item) {
			return item.userEmail== $scope.userEmail;
		});
		return $scope.exists;
	}; 

	$scope.canLogIn= function () {
		var saved= $scope.accountExists();
		var loggedUser;
		if(saved.length>0){
			if(saved[0].userEmail==$scope.userEmail){
				if(saved[0].pass==$scope.pass){
					localStorageService.userLogIn(saved[0]);
					loggedUser= localStorageService.getloggedUser();
					$scope.userError="";
					$scope.userEmail="";
					$scope.pass="";
					$scope.clearForm();
					$window.location.href = ('#/profile/' + loggedUser.id);
				}else{
					$scope.userError= "Usuario o contraseña invalidos";
				}
			}
		}else{
			$scope.userError= "Usuario o contraseña invalidos";
		}
	};

	$scope.clearForm= function () {
			if ($scope.logInForm) {
                    $scope.logInForm.$setPristine();
                    $scope.logInForm.$setUntouched();
            }
	};

}]); //end -controller-