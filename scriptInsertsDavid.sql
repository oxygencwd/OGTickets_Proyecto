/*--Tabla Sitio--*/
	INSERT INTO tbsitio
	(Nombre, PrimerTelefono, SegundoTelefono, Capacidad, UbicacionLongitud, UbicacionLatitud, Direccion, Foto) 
	VALUES 
	('Estadio Nacional', 25490700, null, 2184, -84.107733, 9.933126, 'La Sabana, San José', 'http://i1097.photobucket.com/albums/g342/David_Ness/estadioNacional_zpsenlmq51a.jpg'),
	('Teatro Nacional', 20101111, null, 666, -84.077087, 9.933126, 'Avenida Segunda entre Calles 3 y 5, Centro, San José, Costa Rica', 'http://i1097.photobucket.com/albums/g342/David_Ness/teatroNacional_zpspsz4jbc3.jpg'),
	('Auditorio Nacional', 22227647, null, 500, -84.079934, 9.940770, 'Union, San José, Costa Rica', 'http://i1097.photobucket.com/albums/g342/David_Ness/auditorioNacional_zpsgtbe67wl.jpg'),
	('Palacio de los Deportes', 22381144, null, 674, -84.122229, 9.998976, 'Heredia, Costa Rica', 'http://i1097.photobucket.com/albums/g342/David_Ness/palacioDeportes_zpsk04cgg9q.jpg'),
	('Teatro Popular Melico Salazar', 22956000, 22335172, 2752, -84.079298, 9.933320, 'Calle Central Alfredo Volio, San José, Costa Rica', 'http://i1097.photobucket.com/albums/g342/David_Ness/teatroMelicoSalazar_zpsbumo2jvs.jpg'),
	("Pepper's Club", 22241472, null, 400, -84.049039, 9.918390, 'Maria Auxiliadora, Zapote, Costa Rica', 'http://i1097.photobucket.com/albums/g342/David_Ness/3da91d76-4fc2-4177-91f9-4f4e5fa25ab1_zpshmkyc1e9.jpg');

/*--Tabla Evento--*/
	INSERT INTO tbevento
	(Nombre, Descripcion, FechaEvento, CapacidadPersonas, HoraInicio, HoraFinalizacion, CostoEntrada, Foto, TbTipoEvento_idTipoEvento) 
	VALUES 
	('Frankenstein', 'Un monstruo llamado Frankenstein es creado con los últimos avances de la ciencia por el doctor Víctor Frankenstein, quien espantado por su fealdad, lo abandona y huye. En consecuencia al rechazo de su inventor, inicia un largo y heroíco proceso deaprendizaje hasta llegar a un lugar inexplorado para encontrarse así mismo.', '2016-04-27', 666, '13:00:00', '14:00:00', 7000, 'http://i1097.photobucket.com/albums/g342/David_Ness/frank_zpserboeh6d.jpeg', 4),
	('Día Internacional del Jazz con Túpac Amarulloa', 'El concierto consta de dos partes. La primera es una exposición de jazz costarricense, las composiciones están basadas en la experiencia humana y su inter-relación con el universo. La segunda parte es una recreación del jam session, que es aún hoy en día la forma en que los jazzistas se reúnen a experimentar sin ensayar mas que sus propias habilidades, todo puede pasar en un jam, ya que la exploración se basa en la experiencia individual de cada músico y su relación con el tema que se interpreta.', '2016-04-30' , 666, '20:00:00', '22:00:00', 6500, 'http://i1097.photobucket.com/albums/g342/David_Ness/jazz_zpssmxanwpj.jpg', 1),
	('Iron Maiden en concierto', 'Una nueva gira de esta gran banda britanica de heavy metal.', '2016-04-19', 2184, '19:00:00', '20:00:00', 25000, 'http://i1097.photobucket.com/albums/g342/David_Ness/maiden_zpsrvmtvdxm.jpg', 1),
	('Flamenco de hoy', 'Es una musical que muestra la enorme vitalidad que el ﬂamenco tiene en el siglo XXI.', '2016-04-27', 2752,  '20:00:00',  '22:00:00', 22000, 'http://i1097.photobucket.com/albums/g342/David_Ness/flamenco_zpshcd6rplb.jpg', 4),
	('Tributo a Queen', 'La Orquesta Filarmónica presenta un gran tributo a la gran banda britanica Queen.', '2016-05-14', 2752, '20:00:00', '22:00:00', 25000, 'http://i1097.photobucket.com/albums/g342/David_Ness/queen_zpscyvusx6v.jpg', 1),
	('Jesús Adrián Romero y Marcos Witt', 'Se unen por primera vez en Costa Rica para presentar todos sus éxitos. Será una gran oportunidad para Dar Gracias!', '2016-06-24', 2184, '18:00:00', '20:00:00', 25500, 'http://i1097.photobucket.com/albums/g342/David_Ness/jesusmarco_zpsdla5y27o.jpg', 1),
	('La Fiesta de el Cabo', 'Disfruta de las comedias de el Cabo.', '2016-05-14', 400, '19:00:00', '20:00:00', 12000, 'http://i1097.photobucket.com/albums/g342/David_Ness/elcabo_zpscaol4yak.jpg', 2),
	('Cigala Intimo', 'Concierto de Diego Cigala en Costa Rica.', '2016-04-29', 2752, '20:00:00', '22:00:00', 18000, 'http://i1097.photobucket.com/albums/g342/David_Ness/cigala_zpsdzlgzxwi.jpg', 1),
	('Disney sobre hielo', 'Vive la magia de Disney, en este gran expertaculo sobre hielo.', '2016-04-21', 674, '18:00:00', '20:00:00', 10000, 'http://i1097.photobucket.com/albums/g342/David_Ness/disneyOnIce_zpsjnsc1qrd.jpg', 5),
	('Harlem Globetrotters en Costa Rica', 'Ven a disfrutar de la magia del baloncesto, combinado con el mejor show deportivo del mundo.', '2016-05-26', 674, '19:00:00', '21:00:00', 18000, 'http://i1097.photobucket.com/albums/g342/David_Ness/harlem_zpstsink9ax.png', 3),
	('Ichiro Mizuki en Costa Rica', 'Gran concierto de este integrante japones.', '2016-04-29', 500, '16:00:00', '18:00:00', 6000, 'http://i1097.photobucket.com/albums/g342/David_Ness/ichiro_zpspg4lfgg8.jpg', 1);

/*--Tabla Butacas x Sitio x Seccion--*/
	INSERT INTO tbbutacasporsitioporseccion
	(idSeccion, rowAccount, colAcount ,idSitio) 
	VALUES  
	(PE, 5, 16, 1),
	(PO, 5, 16, 1),
	(PN, 8, 5, 1),
	(PS, 8, 5, 1),
	(BE, 10, 22, 1),
	(BO, 10, 22, 1),
	(BS, 12, 10, 1),
	(BN, 12, 10, 1),
	(GE, 13, 32, 1),
	(GO, 13, 32, 1),
	(GS, 18, 12, 1),
	(GN, 18, 12, 1),
	(PE, 10, 4, 2),
	(PO, 10, 4, 2),
	(PS, 4, 10, 2),
	(BE, 12, 5, 2),
	(BO, 12, 5, 2),
	(BS, 5, 12, 2),
	(GE, 15, 5, 2),
	(GO, 15, 5, 2),
	(GS, 5, 18, 2),
	(VP, 3, 18, 3),
	(BU, 10, 25, 3),
	(GO, 8, 32, 3),
	(GE, 20, 9, 4),
	(GO, 20, 9, 4),
	(GN, 9, 26, 4),
	(PR, 8, 10, 4);

/*--Tabla Evento x Promotor--*/
	INSERT INTO tbeventoporpromotor
	(idEvento, idPromotor) 
	VALUES 
	(1, 3),
	(2, 3),
	(3, 3),
	(4, 3),
	(5, 3),
	(6, 3),
	(7, 3),
	(8, 3),
	(9, 3),
	(10, 3),
	(11, 3);

/*--Tabla Evento x Sitio--*/
	INSERT INTO tbeventoporsitio
	(idEvento, idSitio)  
	VALUES 
	(1, 2),
	(2, 2),
	(3, 1),
	(4, 5),
	(5, 5),
	(6, 1),
	(7, 6),
	(8, 5),
	(9, 4),
	(10, 4),
	(11, 3);

/*--Tabla SolicitudRegistroPromotor--*/
	INSERT INTO tbsolicitudregistropromotor 
	(Approved, PeddingCheck, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, nombreJuridico, Cedula, Email, Contraseña, AreaEspecializacion, PrimerTelefono, SegundoTelefono, Ubicacion) 
	VALUES 
	(true, false, 'Luis', 'Gerardo', 'Camacho', 'Segura', null, 123232212, 'gerardo992@hotmail.com', Contraseña, 'Musica', 77654344, null, 'San Jose, Costa Rica'),
	(false, true, null, null, null, null, 'Luis Samora Events', 345532214, 'eventoSamora@gmail.com', Contraseña, 'Arte', 22234234, 22234233, 'Heredia, Costa Rica');
