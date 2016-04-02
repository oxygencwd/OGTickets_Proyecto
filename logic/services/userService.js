angular.module('OGTicketsApp.services')
.service('userService', ['localStorageService', '$cookieStore', function(localStorageService, $cookieStore) {

	/* login, logout, register, isLoggedIn, getCurrentUser*/
	
	//trae la lista de todos los usuarios del localStorage y verifica si el email registrado existe, si es asi devuelve el objeto con la informacion del usuario.
	var accountExists= function (user) {
		var users= localStorageService.getAll("userList");
		var userExists= users.filter(function (item) {
			return item.email== user.email;
		});
		return userExists;
	}; //fin function	

	//evalua si la contraseña y el password son los correctos, si el usuario esta activo y si pasa las validaciones lo loggea, devuelve un objeto con el nombre, id  y tipo de usuario, y la variable canLogin en true, si no devuelve un mensaje de error y canLogin en false.
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

	//mete en la variable del $scope el usuario loggeado para que este disponible a lo largo de las vistas.
	var login= function (appLoggedUser, usr) {
		appLoggedUser.name= usr.name;
		appLoggedUser.id= usr.id;
		appLoggedUser.userType= usr.userType;
		appLoggedUser.isConnected= true;

		$cookieStore.put('isConnected', true);
      	$cookieStore.put('loggedUser', usr);
	};

	//deslogea al usuario.
	var logout= function (appLoggedUser) {
		appLoggedUser.name ="";
		appLoggedUser.id ="";
		appLoggedUser.userType ="";
		appLoggedUser.isConnected =false;

		$cookieStore.remove('isConnected');
		$cookieStore.remove('loggedUser');
	};//end -logout

	//verifica al refrascar la pagina si hay un cookie guardado con un usuario, si es asi lo loggea, mantiene la persisitencia del usuario loggeado.
	var isLoggedIn= function (appLoggedUser) {
		cUser= $cookieStore.get('loggedUser');
		if(cUser){
			login(appLoggedUser, cUser);
		};
	};

	//devuelve el usuario loggeado desde la cookie almacenada.
	var getLoggedUser= function () {
		var cUser= $cookieStore.get('loggedUser');
		if(cUser){
			return cUser;
		}else{
			return {
				conected: false,
				msg: "User not conected"
			};
		};
	};

		
//puntos de acceso de los metodos del servicio:
	return{
		canLogin:canLogin,
		login:login,
		logout:logout,
		isLoggedIn:isLoggedIn,
		getLoggedUser:getLoggedUser
	};
}]);//end -service-

