angular.module('OGTicketsApp.services')
.service('userService', ['localStorageService', '$cookieStore', function(localStorageService, $cookieStore) {

	/* login, logout, register, isLoggedIn, getCurrentUser*/
	

	var accountExists= function (user) {
		var users= localStorageService.getAll("userList");
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
	}; //end -canLogin

	var login= function (appLoggedUser, usr) {
		appLoggedUser.name= usr.name;
		appLoggedUser.id= usr.id;
		appLoggedUser.userType= usr.userType;
		appLoggedUser.isConnected= true;

		$cookieStore.put('isConnected', true);
      	$cookieStore.put('loggedUser', usr);
	};

	var logout= function (appLoggedUser) {
		appLoggedUser.name ="";
		appLoggedUser.id ="";
		appLoggedUser.userType ="";
		appLoggedUser.isConnected =false;

		$cookieStore.remove('isConnected');
		$cookieStore.remove('loggedUser');
	};//end -logout

	var isLoggedIn= function (appLoggedUser) {
		//var result;
		cUser= $cookieStore.get('loggedUser');
		if(cUser){
			login(appLoggedUser, cUser);
		};
	};

		
		
		
		
	
    

//puntos de acceso de los metodos del servicio:
	return{
		canLogin:canLogin,
		login:login,
		logout:logout,
		isLoggedIn:isLoggedIn
	};
}]);//end -service-

