angular.module('OGTicketsApp.controllers')
.controller('allUsersController', ['$scope','$location', 'userService', function ($scope, $location, userService) {

	$scope.allUsers = userService.allUsersButAdmin();

	$scope.users = userService.users;

	var users = $scope.users;

	$scope.userToDisplay = null; 

	$scope.editActive = function(userId){
		var user = userService.retrieveUser(userId);
		var index= users.indexOf(user);

		if (users[index].active) {
			users[index].active =false;
		}else{
			users[index].active = true;
		}

		users.splice(index, 1);

		users[index]=user;

		userService.setUser(users);
	}

}]); //end -controller-