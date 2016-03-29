angular.module('OGTicketsApp.services')
.service('serviceLogin', [, function() {

	var userCounts= angular.fromJson(localStorage.getItem("userCounts")) || [];

	var userLogIn= function (accountObject) {
		loggedUser= userCounts.filter(function (item) {
			indexOfLoggedUser= userCounts.indexOf(accountObject);
			return item.id== accountObject.id;
		});
		setloggedUser();
	};

	var getloggedUser= function () {
		return loggedUser[0];
	};

	var setloggedUser= function(){
		localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
	};

	var logOut= function () {
		loggedUser={};
		setloggedUser();
	};

	return{
		userLogIn:userLogIn,
		getloggedUser:getloggedUser,
		logOut:logOut
	};
}]);



