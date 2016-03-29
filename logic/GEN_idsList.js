//lista de ids

var listaIds={
		idUser: us01, //us+consecutivo, ids de usuario general
		idAdmin: ad01, //ad+consecutivo, ids del admin
		idClient: cl01, //cl+consecutivo, ids de los clientes
		idPromoter: pr01, //pr+consecutivo, ids de los promotores
		idCashier: cs01, //cs+consecutivo, ids de los cajeros
		idUserType: [  //ut+consecutivo, ids de los tipos de usuario
				ut01,  //ut01= administrador
				ut02,  //ut01= cliente
				ut03,  //ut03= promotor
				ut04  //ut04= cajero
			],
		idEvent: ev01, //ev+consecutivo, ids de los eventos
		idEventType: [ //et+consecutivo, ids de los tipos de eventos
				et01,  //et01= musica 
				et02,  //et02= cultura
				et03,  //et03= deporte
				et04,  //et04= teatro
				et05  //et05= artes
			],
		idSites: si01, //si+consecutivo de los sitios
		idTransaction: tr01, //tr+consecutivo, id de las transacciones OJO aqui cambie esto
		idTransactionType: [ //tt+consecutivo, ids de los eventos
				tt01, //tt01= compra
				tt02  //tt02= reservacion
			]

};


var listaPrefijos= [
		us, ad, cl, 
		pr, cs, ut, 
		ev, et, si,
		tr, tt
];
 