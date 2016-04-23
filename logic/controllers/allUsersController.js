angular.module('OGTicketsApp.controllers')
.controller('allUsersController', ['$scope','$location', 'userService', function ($scope, $location, userService) {

	$scope.userToDisplay = null; 

	$scope.getAllUsersButAdmin = function(){
		var promise = userService.allUsersButAdmin();
		promise.then(function (data){
			$scope.allUsers = data.data;

			angular.forEach($scope.allUsers, function(user){
				user.name = userService.parseName(user);
			})

			console.log($scope.allUsers);

		})
		.catch(function(error){
			console.log(error);
		})
	};

	$scope.getAllUsersButAdmin();

}]); //end -controller-