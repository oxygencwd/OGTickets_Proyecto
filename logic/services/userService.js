angular.module('OGTicketsApp.services')
.service('userService', ['localStorageService', function(localStorageService) {

	/* login, logout, register, isLoggedIn, getCurrentUser*/
	

	var accountExists= function (user) {
		var users= localStorageService.getAll("clientList");
		var userExists= users.filter(function (item) {
			return item.email== user.email;
		});
		return userExists;
	}; //fin function	

	var canLogin= function (user) {
		var saved= accountExists(user);
		var loggedUser={};
		var msg="user found";
		var canLogin= false;
		var result={};
		if(saved.length>0 && saved[0].active==true && saved[0].email==user.email && saved[0].password==user.password){
			loggedUser= {
				name: saved[0].name,
				id: saved[0].id,
				userType: saved[0].userType
			};
			canLogin= true;
			result={
				user: loggedUser,
				msg: msg,
				canLogin: canLogin
			};
		}else{
			msg= "user not found";
			result={
				msg:msg,
				canLogin: canLogin
			};	
		};

		return result;
	};

	
    

//puntos de acceso de los metodos del servicio:
	return{
		canLogin:canLogin
	};
}]);//end -service-

