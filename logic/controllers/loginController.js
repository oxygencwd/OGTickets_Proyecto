angular.module('OGTicketsApp.controllers')
.controller('loginController', ['$scope', function ($scope) {
	
	$scope.canLogIn= function () {
		var saved= $scope.accountExists();
		var loggedUser;
		if(saved.length>0){
			if(saved[0].username==$scope.useremail){
				if(saved[0].pass==$scope.pass){
					BDService.userLogIn(saved[0]);
					loggedUser= BDService.getloggedUser();
					$scope.userError="";
					$scope.useremail="";
					$scope.pass="";
					$scope.clearForm();
					$window.location.href = ('#/summary/' + loggedUser.id);
				}else{
					$scope.userError= "Usuario o contraseña invalidos";
				}
			}
		}else{
			$scope.userError= "Usuario o contraseña invalidos";
		}
	};

	$scope.clearForm= function () {
			if ($scope.canLogIn) {
                    $scope.canLogIn.$setPristine();
                    $scope.canLogIn.$setUntouched();
            }
	};

}]); //end -controller-