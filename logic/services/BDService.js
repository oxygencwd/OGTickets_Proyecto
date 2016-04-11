angular.module('OGTicketsApp.services')
.service('BDService', ['localStorageService', function(localStorageService) {

	//listas quemadas
	var savedUserList=[
		{ "name": "Manuel Mendoza", "id": "cl01", "active": true, "phone":"84394523", "email": "manuelmendoza@gmail.com", "password": "Abcdefg1", "gender": "Masculino", "personalId": "115290295", "birthday": "1994-04-29T06:00:00.000Z", "userType": "ut02" },

		{ "name": "Juan Pérez", "id": "cl02", "active": true, "phone":"50943234", "email": "juanperez@gmail.com", "password": "Juanperez2", "gender": "Masculino", "personalId": "109820432", "birthday": "1984-06-22T06:00:00.000Z", "userType": "ut02" },

		{ "name": "Karla Jiménez", "id": "cl03", "active": false, "phone":"76432432", "email": "karlajimenez@yahoo.es", "password": "Karlita26", "gender": "Femenino", "personalId": "112980324", "birthday": "1990-06-26T06:00:00.000Z", "userType": "ut02" },

		{ "name": "Naty Mata", "id": "cl04", "active": true, "phone":"85423689", "email": "natymata@gmail.com", "password": "123", "gender": "Femenino", "personalId": "304080245", "birthday": "1986-01-26T06:00:00.000Z", "userType": "ut02" },
/*promotores*/
		{ "name": "Cheese Productions", "password": "Holahola77", "id": "pr01", "active": true, "email": "cheeseproductions@gmail.com", "personalId": "3816497372", "areaOfSpecialization": "Conciertos", "phoneOne": "60324127", "address": "Desamparados, San José", "phoneTwo": "22236543", "userType": "ut03" },

		{ "name": "Jonathan Ryzowy", "password": "Distrito55", "active": true, "email": "ryzowy@gmail.com", "personalId": "105720123", "areaOfSpecialization": "Cultura", "phoneOne": "88328319", "id": "pr02", "address": "Santa Ana, Costa Rica", "userType": "ut03" },

		{ "name": "Francisca Productions", "password": "Francisquita2", "active": false, "id": "pr03", "email": "info@franciscaproductions.com", "personalId": "3692134812", "areaOfSpecialization": "Deportes", "phoneOne": "22138844", "address": "Santo Domingo, Heredia", "userType": "ut03"},
/*cajeros*/
		{ "name": "Juanita Hidalgo Rodríguez", "active": true, "password": "Hidalgo92", "id": "cs01", "gender": "Femenino", "email": "j.hidalgo.rodriguez@hotmail.com", "personalId": "183323434", "phone": "88120922", "birthday": "1991-10-21T06:00:00.000Z", "userType": "ut04" },

		{ "name": "Josefina Duarte", "password": "Duarte", "active": true, "id": "cs02", "gender": "Femenino", "email": "josefita@yahoo.com", "personalId": "103923221", "phone": "22216709", "birthday": "1983-09-12T06:00:00.000Z", "userType": "ut04" },

		{ "name": "Carlos Ugalde", "password": "Ugalde2223", "active": true, "id": "cs03", "gender": "Masculino", "email": "carlosugalde_8732@hotmail.com", "personalId": "129321262", "phone": "73902476", "birthday": "1993-01-29T06:00:00.000Z", "userType": "ut04"},
/*admin*/		
		{"name": "Admin", "id": "ad01", "password": "admin", "email": "oxyGenAdmin@gmail.com", "userType": "ut01", "active": true}
	];

	var savedEventsList=[
		{ "startHour": "7:00pm", "endHour": "10:00pm",  "siteId": "si03", "active": true, "description": "Viene Rihanna con su World Tour, un verdadero show que no te podés perder", "date": "2016-06-16T06:00:00.000Z", "id": "ev01", "name": "Rihanna World Tour", "ticketsPrice": 35500, "eventType": "et01", "capacity": 2102, "image": "images/event-default-images/imagen6.jpg", "promoterId": "pr02" },

		{ "startHour": "7:00pm", "endHour": "9:30pm", "active": true, "siteId": "si03", "description": "Costa Rica recibe a Jamaica", "name": "Costa Rica vs Jamaica", "id": "ev02", "date": "2016-04-17T06:00:00.000Z", "eventType": "et03", "ticketsPrice": 8000, "capacity": 2102, "image": "images/event-default-images/imagen4.jpg", "promoterId": "pr02"  },

		{ "startHour": "8:00pm", "endHour": "9:00pm", "active": true, "siteId": "si02", "description": "Revive y canta junto con Jaime Gamboa y Malpaís las canciones inolvidables que nos dejó Fidel Gamboa", "name": "Malpaís en concierto" , "id": "ev03", "date": "2016-05-16T06:00:00.000Z", "eventType": "et01", "ticketsPrice": 5000, "capacity": 642, "image": "images/event-default-images/imagen2.jpg", "promoterId": "pr01" },

		{ "startHour": "6:00pm", "endHour": "7:00pm", "active": true, "siteId": "si05", "description": "Espactáculo anual de la Compañía Nacional de Danza Contemporanea", "name": "Renacer" , "id": "ev04", "date": "2016-04-16T06:00:00.000Z", "eventType": "et05", "ticketsPrice": 3000, "capacity": 300, "image": "images/event-default-images/imagen7.jpg", "promoterId": "pr03" },

		{ "startHour": "6:00pm", "endHour": "10:00pm", "active": true, "siteId": "si01", "description": "Las mejores obras de la temporada en una sola noche", "name": "Festival Nacional de Teatro" , "id": "ev05", "date": "2016-04-16T06:00:00.000Z", "eventType": "et04", "ticketsPrice": 5000, "capacity": 692, "image": "images/event-default-images/imagen8.jpg", "promoterId": "pr01" },

		{ "startHour": "6:30pm", "endHour": "9:00pm", "active": true, "siteId": "si04", "description": "No se pierda la gran final Nacional de Baloncesto entre Barba y el Liceo de Costa Rica", "name": "Final Nacional de Baloncesto" , "id": "ev06", "date": "2016-07-16T06:00:00.000Z", "eventType": "et03", "ticketsPrice": 3500, "capacity": 540, "image": "images/event-default-images/imagen9.jpg", "promoterId": "pr02" }
	];

	var savedSiteList=[
		{ "id": "si01", "name":"Teatro Nacional", "phoneOne": 20101110, "phoneTwo": 20101111, "capacity": 692, "latitude": 9.933126, "longitude": -84.077087, "address": "Avenida Segunda entre Calles 3 y 5, Centro, San José, Costa Rica", "active": true},

		{ "id": "si02", "name":"Auditorio Nacional", "phoneOne": 22230725, "phoneTwo": "", "capacity": 642, "latitude": 9.933238, "longitude": -84.068303, "address": "San José, Costa Rica", "active": true},

		{ "id": "si03", "name":"Estadio Nacional", "phoneOne": 25490700, "phoneTwo": "", "capacity": 2102, "latitude": 9.936619, "longitude": -84.107733, "address": "Parque Metropolitano la Sabana, San José, Costa Rica", "active": true},

		{ "id": "si04", "name":"Palacio de los Deportes", "phoneOne": 25986536, "phoneTwo": "", "capacity": 540, "latitude": 10.936619, "longitude": -82.107733, "address": "Heredia, Costa Rica", "active": true},

		{ "id": "si05", "name":"Teatro de la Danza", "phoneOne": 25486985, "phoneTwo": "", "capacity": 300, "latitude": 11.555619, "longitude": -85.107733, "address": "San José, Costa Rica", "active": true}
	];

	var savedTransactionList=[
		{"id": "tr01", "cancelled": true, "transactionType": "tt01", "eventId": "ev02", "ticketsAmount" : 2, "idClient": "cl02", "active": true, "trCode":"pu-cl02-ev02-0329-tr01" }
	];

	var savedEventTypeList = [
		{"name": "Música","description":"Es el arte de combinar los sonidos de la voz humana o de los instrumentos, o de unos y otros a la vez, para crear un determinado efecto.", "id": "et01", 'active': true}, 
		{"name": "Cultura","description":"Es una especie de tejido social que abarca las distintas formas y expresiones de una sociedad determinada.", "id": "et02", 'active': true}, 
		{"name": "Deportes","description":"Es la actividad física pautada conforme a reglas y que se practica con finalidad recreativa, profesional o como medio de mejoramiento de la salud.", "id": "et03", 'active': true}, 
		{"name": "Teatro","description":"Es el arte que busca representar historias frente a una audiencia, combinando actuación, discurso, gestos, escenografía, música y sonido.", "id": "et04", 'active': true}, 
		{"name": "Arte","description":"Es el concepto que engloba todas las creaciones realizadas por el ser humano para expresar una visión sensible acerca del mundo, ya sea real o imaginario.", "id": "et05", 'active': true}
	];

	var savedPromoterRegisterRequest = [
		//solicitudes aprobadas
		{ "approved": true, "pendingCheck": false, "name": "Cheese Productions", "password": "Holahola77", "id": "rq01", "email": "cheeseproductions@gmail.com", "personalId": "3816497372", "areaOfSpecialization": "Conciertos", "phoneOne": "60324127", "address": "Desamparados, San José", "phoneTwo": "22236543", "userType": 3 },
		{ "approved": true, "pendingCheck": false, "name": "Jonathan Ryzowy", "password": "Distrito55", "email": "ryzowy@gmail.com", "personalId": "105720123", "areaOfSpecialization": "Cultura", "phoneOne": "88328319", "id": "rq02", "address": "Santa Ana, Costa Rica", "userType": 3 },
		{ "approved": true, "pendingCheck": false, "name": "Francisca Productions", "password": "Francisquita2", "id": "rq03", "email": "info@franciscaproductions.com", "personalId": "3692134812", "areaOfSpecialization": "Deportes", "phoneOne": "22138844", "address": "Santo Domingo, Heredia", "userType": 3 },
		//solicitudes no aprovadas
		{ "approved": false, "pendingCheck": true, "name": "Degree Productions", "password": "degree1", "id": "rq04", "email": "degree@gmail.com", "personalId": "5864597372", "areaOfSpecialization": "Arte", "phoneOne": "75632589", "address": "Escazu, San José", "phoneTwo": "25639856", "userType": 3 },
		{ "approved": false, "pendingCheck": true, "name": "Yoda Productions", "password": "yoda1", "email": "yadainfo@gmail.com", "personalId": "305690589", "areaOfSpecialization": "Teatro", "phoneOne": "75698632", "id": "rq05", "address": "Moravia, Costa Rica", "userType": 3 },
		{ "approved": false, "pendingCheck": true, "name": "Backstage Productions", "password": "bs1234", "id": "rq06", "email": "bsinfo@backstage.com", "personalId": "13698756", "areaOfSpecialization": "Música", "phoneOne": "29865647", "address": "Paraíso, Cartago", "userType": 3 },

	];

	var savedReservedSeatxEventxSite = [
		//evento de Rihanna, Estadio Nacional
		{"eventId": "ev01","siteId":"si03", "Zoneid": "PE", "seatId": "A2", 'active': true},
		{"eventId": "ev01","siteId":"si03", "Zoneid": "PN", "seatId": "A2", 'active': true}, 
		{"eventId": "ev01","siteId":"si03", "Zoneid": "PE", "seatId": "A3", 'active': true},
		{"eventId": "ev01","siteId":"si03", "Zoneid": "PO", "seatId": "B2", 'active': true},
		{"eventId": "ev01","siteId":"si03", "Zoneid": "PS", "seatId": "B2", 'active': true},
		{"eventId": "ev01","siteId":"si03", "Zoneid": "BE", "seatId": "A6", 'active': true},
		{"eventId": "ev01","siteId":"si03", "Zoneid": "BS", "seatId": "C2", 'active': true},
		{"eventId": "ev01","siteId":"si03", "Zoneid": "BN", "seatId": "A6", 'active': true},
		{"eventId": "ev01","siteId":"si03", "Zoneid": "BO", "seatId": "C7", 'active': true},
		{"eventId": "ev01","siteId":"si03", "Zoneid": "GO", "seatId": "B5", 'active': true},
		{"eventId": "ev01","siteId":"si03", "Zoneid": "GS", "seatId": "A6", 'active': true},
		//Evento de Mal País, Auditorio Nacional
		{"eventId": "ev03","siteId":"si02", "Zoneid": "VP", "seatId": "A2", 'active': true},
		{"eventId": "ev03","siteId":"si02", "Zoneid": "VP", "seatId": "B5", 'active': true},
		{"eventId": "ev03","siteId":"si02", "Zoneid": "BU", "seatId": "A6", 'active': true},
		{"eventId": "ev03","siteId":"si02", "Zoneid": "BU", "seatId": "B7", 'active': true},
		{"eventId": "ev03","siteId":"si02", "Zoneid": "BU", "seatId": "B8", 'active': true},
		{"eventId": "ev03","siteId":"si02", "Zoneid": "GO", "seatId": "C4", 'active': true},
		{"eventId": "ev03","siteId":"si02", "Zoneid": "GO", "seatId": "C5", 'active': true},
		{"eventId": "ev03","siteId":"si02", "Zoneid": "GO", "seatId": "C6", 'active': true},
		//Festival de Teatro en el Teatro Nacional
		{"eventId": "ev05","siteId":"si01", "Zoneid": "LU", "seatId": "A2", 'active': true},
		{"eventId": "ev05","siteId":"si01", "Zoneid": "LU", "seatId": "A3", 'active': true},
		{"eventId": "ev05","siteId":"si01", "Zoneid": "PE", "seatId": "C4", 'active': true},
		{"eventId": "ev05","siteId":"si01", "Zoneid": "PO", "seatId": "D6", 'active': true},
		{"eventId": "ev05","siteId":"si01", "Zoneid": "PS", "seatId": "C3", 'active': true},
		{"eventId": "ev05","siteId":"si01", "Zoneid": "BE", "seatId": "B5", 'active': true},
		{"eventId": "ev05","siteId":"si01", "Zoneid": "BO", "seatId": "C4", 'active': true},
		{"eventId": "ev05","siteId":"si01", "Zoneid": "GO", "seatId": "A6", 'active': true},
		{"eventId": "ev05","siteId":"si01", "Zoneid": "GS", "seatId": "G2", 'active': true},
		//Final nacioal de baloncesto en el Palacio de los Deportes
		{"eventId": "ev06","siteId":"si04", "Zoneid": "GE", "seatId": "A6", 'active': true},
		{"eventId": "ev06","siteId":"si04", "Zoneid": "GE", "seatId": "A3", 'active': true},
		{"eventId": "ev06","siteId":"si04", "Zoneid": "GN", "seatId": "C4", 'active': true},
		{"eventId": "ev06","siteId":"si04", "Zoneid": "GN", "seatId": "D6", 'active': true},
		{"eventId": "ev06","siteId":"si04", "Zoneid": "GO", "seatId": "C3", 'active': true},
		{"eventId": "ev06","siteId":"si04", "Zoneid": "GO", "seatId": "B5", 'active': true}
	];


	//metodos ara cargar la base de datos con datos

	//quemar los datos de usuarios
	var userList= function () {
		return localStorageService.getOrArray("userList", savedUserList);
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
	 
	//quemar los datos del tipo de evento
	var eventTypeList= function () {
		return localStorageService.getOrArray("eventTypeList", savedEventTypeList);
	};

	//quemar los datos del tipo de evento
	var promoterRegisterRequest= function () {
		return localStorageService.getOrArray("promoterRegisterRequest", savedPromoterRegisterRequest);
	};

	//quemar los datos del tipo de evento
	var reservedSeatxEventxSite= function () {
		return localStorageService.getOrArray("reservedSeatxEventxSite", savedReservedSeatxEventxSite);
	};
	


//puntos de acceso de los metodos del servicio:
	return{
		userList:userList,
		eventsList:eventsList,
		siteList:siteList,
		transactionList:transactionList,
		eventTypeList:eventTypeList,
		promoterRegisterRequest:promoterRegisterRequest,
		reservedSeatxEventxSite:reservedSeatxEventxSite
	};
}]);//end -service-




