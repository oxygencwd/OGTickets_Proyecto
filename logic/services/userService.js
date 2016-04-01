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
		var loggedUser;
		var error="";
		var canLogin= false;
		if(saved.length>0){
			if(saved[0].email==user.email){
				if(saved[0].password==user.password){
					loggedUser= {
						name: saved[0].name,
						id: saved[0].id,
						userType: saved[0].userType
					} 
					canLogin= true;
				}else{
					error= "Usuario o contraseña invalidos";
				}
			}
		}else{
			error= "Usuario o contraseña invalidos";
		};

		var result={
			user: loggedUser,
			msg: error,
			canLogin: canLogin
		};
		return result;
	};

	var login= function () {
		
	};


	
	// var userLogIn= function (accountObject) {
	// 		loggedUser= accounts.filter(function (item) {
	// 			indexOfLoggedUser= accounts.indexOf(accountObject);
	// 			return item.id== accountObject.id;
	// 		});
	// 		setloggedUser();
	// 	};

    

//puntos de acceso de los metodos del servicio:
	return{
		canLogin:canLogin
	};
}]);//end -service-


 // var getAll = function(key) {
 //        return angular.fromJson(localStorage.getItem(key));
 //    };