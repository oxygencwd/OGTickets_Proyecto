angular.module('OGTicketsApp.services')
.service('userService', ['localStorageService', '$log', '$q', '$http', '$cookieStore', function(localStorageService,$log, $q, $http, $cookieStore) {

	var users= localStorageService.getAll("userList");

	//All users but admin
	var allUsersButAdmin= function (){
		result = users.filter(function (item) {
            return item.userType !== 'ut01';
        });
        return result;
	};

	//RetrieveUser by id
	var retrieveUser = function(userId){
		var result= users.filter(function (item) {
			return item.id== userId;
			});
			
		return result[0];
	};

	var setUser = function(users){
		localStorageService.set("userList", users);
	};
	
	
	//evalua si la contraseña y el password son los correctos, si el usuario esta activo y si pasa las validaciones lo loggea, devuelve un objeto con el nombre, id  y tipo de usuario, y la variable canLogin en true, si no devuelve un mensaje de error y canLogin en false.
	var canLogin= function (user) {
		var defer= $q.defer();
		var url= 'back-end/index.php/user/login';

		$http.post(url, user)
		.success(function(data, status) {
		defer.resolve(data);
		})
		.error(function(error, status) {
		defer.reject(error);
		$log.error(error, status);
		});

		return defer.promise;
	}; //end -canLogin

	

	// var canLogin= function(objLogin) {
	// 	var url= 'back-end/index.php/user/login'
	// 	result= $http.post(url, objLogin);
	// 	return result;
	// };




	//mete en la variable del $scope el usuario loggeado para que este disponible a lo largo de las vistas.
	var login= function (appLoggedUser, objUsr) {
		var usr= {};
		usr.name= parseName(objUsr);
		usr.id= objUsr.userId;
		usr.userType= objUsr.userType;

		appLoggedUser.name= usr.name;
		appLoggedUser.id= usr.id;
		appLoggedUser.userType= usr.userType;
		appLoggedUser.isConnected= true;

		$cookieStore.put('isConnected', true);
      	$cookieStore.put('loggedUser', usr);
	};

	//toma el objeto y pasa por cada uno de los componentes el nombre y regresa el nombre completo con que el usuario esta regitrado.
	var parseName= function(objUsr) {
		var array=[];
		array[0]= objUsr.firstName;
		array[1]= objUsr.secondName;
		array[2]= objUsr.lastName;
		array[3]= objUsr.secondLastName;
		for(i= 0; i<array.length; i++) {
			if(array[i]==null){
				array.splice(i,1);
			}
		}
		return array.join(" ");
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

	//devuelve el usuario loggeado desde la cookie almacenada. Devuelve solo el id, el userType y el nombre.
	var getLoggedUser= function () {
		var cUser= $cookieStore.get('loggedUser');
		if(cUser){
			return cUser;
		}else{
			return false;
		};
	};
	

		
//puntos de acceso de los metodos del servicio:
	return{
		canLogin:canLogin,
		login:login,
		logout:logout,
		isLoggedIn:isLoggedIn,
		getLoggedUser:getLoggedUser,
		users:users,
		allUsersButAdmin: allUsersButAdmin,
		retrieveUser: retrieveUser
	};
}]);//end -service-

