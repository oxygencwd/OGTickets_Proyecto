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
			console.info(data);
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
		appLoggedUser.firstName= objUsr.firstName;
		appLoggedUser.secondName= objUsr.secondName;
		appLoggedUser.lastName= objUsr.lastName;
		appLoggedUser.secondLastName= objUsr.secondLastName;
		appLoggedUser.navBarName= parseName(objUsr);
		appLoggedUser.userId= objUsr.userId;
		appLoggedUser.userType= objUsr.userType;
		appLoggedUser.isConnected= true;

		var usr= {};
<<<<<<< HEAD
		// usr.name= parseName(objUsr);
		// usr.userId= objUsr.userId;
		// usr.userType= objUsr.userType;

		// appLoggedUser.name= usr.name;
		// appLoggedUser.userId= usr.userId;
		// appLoggedUser.userType= usr.userType;
		// appLoggedUser.isConnected= true;

		// $cookieStore.put('isConnected', true);
  //     	$cookieStore.put('loggedUser', usr);

  //     	localStorageService.set('loggedUser', usr);
=======
		usr.userId= objUsr.userId;
		usr.userType= objUsr.userType;
		usr.navBarName= parseName(objUsr);
		
		$cookieStore.put('isConnected', true);
      	$cookieStore.put('loggedUser', usr);

		localStorageService.set('loggedUser', objUsr);
>>>>>>> e94caf05564c90bdff8fe81e5bf0f94df0bd559d
	};

	

	//toma el objeto y pasa por cada uno de los componentes el nombre y regresa el nombre completo con que el usuario esta regitrado.
	var parseName= function(objUsr) {
		var array=[];
		if(objUsr.name){
			return objUsr.name
		}else{
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
		}
	};

	//deslogea al usuario.
	var logout= function (appLoggedUser) {
		appLoggedUser.firstName= "";
		appLoggedUser.secondName= "";
		appLoggedUser.lastName= "";
		appLoggedUser.secondLastName= "";
		appLoggedUser.userId= "";
		appLoggedUser.userType= "";
		appLoggedUser.isConnected= false;

		$cookieStore.remove('isConnected');
		$cookieStore.remove('loggedUser');

		localStorageService.remove('loggedUser');

		backLogout();
	};//end -logout

	var backLogout= function() {
		var defer= $q.defer();
		var url= 'back-end/index.php/user/logout';
		$http.get(url)
		.success(function(data) {
			defer.resolve(data);
		})
		.error(function(error, status) {
			defer.reject(error);
			$log.error(error, status);
		});
		return defer.promise;
	}

	//verifica al refrascar la pagina si hay un cookie guardado con un usuario, si es asi lo loggea, mantiene la persisitencia del usuario loggeado.
	var isLoggedIn= function () {
		//cUser= $cookieStore.get('loggedUser');
		cUser= localStorageService.getAll("loggedUser");
		if(cUser){
			return true
		}else{
			return false;
		}
	};

	//devuelve el usuario loggeado 
	var getLoggedUser= function () {
		//var cUser= localStorageService.getAll('loggedUser');
		var cUser= $cookieStore.get("loggedUser");
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

