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
	
	
	//Envía los datos del usuario que intenta ingresar al sistema al back-end posteriormente recibe la respuesta del back-end y la reenvia hacia el controlador.
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


	//Coloca el nombre, id y tipo de usuario en un cookie, asi como en la variable del $scope global de la app appLoggedUser para que estos datos esten disponibles en toda la app.
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

