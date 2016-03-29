angular.module('OGTicketsApp.services')
.service('BDService', ['localStorageService', function(localStorageService) {

	//listas quemadas
	var savedClientList=[
		{ "name": "Manuel Mendoza", "id": "cl01", "active": true, "email": "manuelmendoza@gmail.com", "password": "Abcdefg1", "gender": "Masculino", "personalId": "115290295", "birthday": "1994-04-29T06:00:00.000Z", "userType": 2 },
		{ "name": "Juan Pérez", "id": "cl02", "active": true, "email": "juanperez@gmail.com", "password": "Juanperez2", "gender": "Masculino", "personalId": "109820432", "birthday": "1984-06-22T06:00:00.000Z", "userType": 2 },
		{ "name": "Karla Jiménez", "id": "cl03", "active": true, "email": "karlajimenez@yahoo.es", "password": "Karlita26", "gender": "Femenino", "personalId": "112980324", "birthday": "1990-06-26T06:00:00.000Z", "userType": 2 }
	];

	var savedPromotorList=[
		{ "name": "Cheese Productions", "password": "Holahola77", "id": "pr01", "active": true, "email": "cheeseproductions@gmail.com", "personalId": "3816497372", "areaOfSpecialization": "Conciertos", "phoneOne": "60324127", "address": "Desamparados, San José", "phoneTwo": "22236543", "userType": 3 },
		{ "name": "Jonathan Ryzowy", "password": "Distrito55", "active": true, "email": "ryzowy@gmail.com", "personalId": "105720123", "areaOfSpecialization": "Cultura", "phoneOne": "88328319", "id": "pr02", "address": "Santa Ana, Costa Rica", "userType": 3 },
		{ "name": "Francisca Productions", "password": "Francisquita2", "active": true, "id": "pr03", "email": "info@franciscaproductions.com", "personalId": "3692134812", "areaOfSpecialization": "Deportes", "phoneOne": "22138844", "address": "Santo Domingo, Heredia", "userType": 3}
	];

	var savedCashierList=[
		{ "name": "Juanita Hidalgo Rodríguez", "active": true, "password": "Hidalgo92", "id": "cs01", "gender": "Femenino", "email": "j.hidalgo.rodriguez@hotmail.com", "phone": "88120922", "birthday": "1991-10-21T06:00:00.000Z", "userType": 4 },
		{ "name": "Josefina Duarte", "password": "Duarte7621", "active": true, "id": "cs02", "gender": "Femenino", "email": "josefita@yahoo.com", "phone": "22216709", "birthday": "1983-09-12T06:00:00.000Z", "userType": 4 },
		{ "name": "Carlos Ugalde", "password": "Ugalde2223", "active": true, "id": "cs03", "gender": "Masculino", "email": "carlosugalde_8732@hotmail.com", "phone": "73902476", "birthday": "1993-01-29T06:00:00.000Z", "userType": 4}
	];

	var savedEventsList=[
		{ "startHour": "7:00pm", "endHour": "10:00pm",  "siteId": "si03", "active": true, "description": "Viene Rihanna con su World Tour, un verdadero show que no te podés perder", "date": "2016-04-27T06:00:00.000Z", "id": "ev01", "name": "Rihanna World Tour", "ticketsPrice": 35500, "eventType": "Música", "capacity": 6000 },
		{ "startHour": "7:00pm", "endHour": "9:30pm", "active": true, "siteId": "si03", "description": "Costa Rica recibe a Jamaica", "name": "Costa Rica vs Jamaica", "id": "ev02", "date": "2016-04-17T06:00:00.000Z", "eventType": "Deportes", "ticketsPrice": 8000, "capacity": 7000 },
		{ "startHour": "7:00pm", "endHour": "9:00pm", "active": true, "siteId": "si02", "description": "Revive y canta junto con Jaime Gamboa y Malpaís las canciones inolvidables que nos dejó Fidel Gamboa", "name": "Malpaís en concierto" , "id": "ev03", "date": "2016-05-16T06:00:00.000Z", "eventType": "Música", "ticketsPrice": 5000, "capacity": 3000 }
	];

	var savedSiteList=[
		{ "id": "si01", "name":"Teatro Nacional", "phoneOne": 20101110, "phoneTwo": 20101111, "capacity": 4000, "latitude": 125, "longitude": 346, "address": "Avenida Segunda entre Calles 3 y 5, Centro, San José, Costa Rica", "active": true },
		{ "id": "si02", "name":"Bar el Observatorio", "phoneOne": 22230725, "phoneTwo": "", "capacity": 300, "latitude": 458, "longitude": 154, "address": "La California, San José, Costa Rica", "active": true },
		{ "id": "si03", "name":"Estadio Nacional", "phoneOne": 25490700, "phoneTwo": "", "capacity": 36500, "latitude": 127, "longitude": 452, "address": "Parque Metropolitano la Sabana, San José, Costa Rica", "active": true }
	];

	var savedTransactionList=[
		{"id": "tr01", "cancelled": true, "transactionType": 1, "eventId": "ev02", "ticketsAmount" : 2}
	];

	var savedAdminList = [
		{"id": "ad01", "password": "admin", "email": "oxyGenAdmin@gmail.com", "userType": 1}
	];

	var savedEventTypeList = [
		{"name": "Música", "id": 1, "value": "musica"}, 
		{"name": "Cultura", "id": 2, "value": "cultura"}, 
		{"name": "Deportes", "id": 3, "value": "deportes"}, 
		{"name": "Teatro", "id": 4, "value": "teatro"}, 
		{"name": "Arte", "id": 5, "value": "arte"}
	];

	var savedPromoterRegisterRequest = [
		{ "approved": false, "pendingCheck": true, "name": "Cheese Productions", "password": "Holahola77", "id": "pr01", "active": true, "email": "cheeseproductions@gmail.com", "personalId": "3816497372", "areaOfSpecialization": "Conciertos", "phoneOne": "60324127", "address": "Desamparados, San José", "phoneTwo": "22236543", "userType": 3 },
		{ "approved": false, "pendingCheck": true, "name": "Jonathan Ryzowy", "password": "Distrito55", "active": true, "email": "ryzowy@gmail.com", "personalId": "105720123", "areaOfSpecialization": "Cultura", "phoneOne": "88328319", "id": "pr02", "address": "Santa Ana, Costa Rica", "userType": 3 },
		{ "approved": false, "pendingCheck": true, "name": "Francisca Productions", "password": "Francisquita2", "active": true, "id": "pr03", "email": "info@franciscaproductions.com", "personalId": "3692134812", "areaOfSpecialization": "Deportes", "phoneOne": "22138844", "address": "Santo Domingo, Heredia", "userType": 3 }
	];


	//metodos ara cargar la base de datos con datos

	//quemar los datos de cliente
	var clientList= function () {
		return localStorageService.getOrArray("clientList", savedClientList);
	};

	//quemar los datos de promotor
	var promoterList= function () {
		return angular.fromJson(localStorage.getItem("promoterList")) || localStorage.setItem("promoterList", JSON.stringify(savedPromotorList));
		// return localStorageService.getOrArray("promoterList", savedPromotorList);
	};

	//quemar los datos de cajero
	var cashierList= function () {
		return localStorageService.getOrArray("cashierList", savedCashierList);
	};

	//quemar los datos de evento
	var eventsList= function () {
		return localStorageService.getOrArray("eventsList", savedEventsList);
	};

	//quemar los datos de sitio
	var siteList= function () {
		return localStorageService.getOrArray("siteList", savedSiteList);
	};

	//quemar los datos de transacciones
	var transactionList= function () {
		return localStorageService.getOrArray("transactionList", savedTransactionList);
	};

	//quemar los datos del admin
	var adminList= function () {
		return localStorageService.getOrArray("adminList", savedAdminList);
	};
	 
	//quemar los datos del tipo de evento
	var eventTypeList= function () {
		return localStorageService.getOrArray("eventTypeList", savedEventTypeList);
	};

	//quemar los datos del tipo de evento
	var promoterRegisterRequest= function () {
		return localStorageService.getOrArray("promoterRegisterRequest", savedPromoterRegisterRequest);
	};

	



//puntos de acceso de los metodos del servicio:
	return{
		clientList:clientList,
		promoterList:promoterList,
		cashierList:cashierList,
		eventsList:eventsList,
		siteList:siteList,
		transactionList:transactionList,
		adminList:adminList,
		eventTypeList:eventTypeList,
		promoterRegisterRequest:promoterRegisterRequest
	};
}]);//end -service-




