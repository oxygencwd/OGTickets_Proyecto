use og_tickets;

/*INSERTS TABLA TIPO USUARIO*/
INSERT INTO tbtipousuario
(NombreTipoUsuario) 
VALUES 
('admin');

INSERT INTO tbtipousuario
(NombreTipoUsuario) 
VALUES 
('client');

INSERT INTO tbtipousuario
(NombreTipoUsuario) 
VALUES 
('promoter');

INSERT INTO tbtipousuario
(NombreTipoUsuario) 
VALUES 
('cashier');

select * from tbtipousuario;



/*INSERTS EN LA TABLA USUARIO.*/
INSERT INTO tbusuario
(PrimerNombre, PrimerApellido, Cedula, Email, password, TbTipoUsuario_idTipoUsuario) 
VALUES 
('oxyGen', 'CWD', 0000000, 'oxygen@gmail.com', '$2y$10$O1OVU7p/bSjKzGnQjPBrYORWoXzKDslgK1io75Kf6rS', 1);

INSERT INTO tbusuario
(PrimerNombre, PrimerApellido, Cedula, Email, password, TbTipoUsuario_idTipoUsuario) 
VALUES 
('Naty', 'Mata', 304080245, 'naty@gmail.com', '$2y$10$nFo/W18QpggTP7G7WMuAIeB0il0jGc3tBEWqLnZ19YM', 2);

INSERT INTO tbusuario
(PrimerNombre, PrimerApellido, Cedula, Email, password, TbTipoUsuario_idTipoUsuario) 
VALUES 
('Ariana', 'Aguilar', 125638963, 'ari@cenfo.com', '$2y$10$nFo/W18QpggTP7G7WMuAIeB0il0jGc3tBEWqLnZ19YM', 3);

INSERT INTO tbusuario
(PrimerNombre, PrimerApellido, Cedula, Email, password, TbTipoUsuario_idTipoUsuario) 
VALUES 
('Josefita', 'Duarte', 652148745, 'josefita@ogt.com', '$2y$10$nFo/W18QpggTP7G7WMuAIeB0il0jGc3tBEWqLnZ19YM', 4);

select * from tbusuario;


/*INSERTS EN LA TABLA DE ADMINISTRADOR*/
INSERT INTO tbadministrador 
(TbUsuario_idUsuario) 
VALUES 
(1);

select * from tbadministrador;

/*INSERTS EN LA TABLA CLIENTE.*/
INSERT INTO tbcliente
(FechaNacimiento, Telefono, Genero, TbUsuario_idUsuario) 
VALUES 
('1986-02-01 ', '88823222', 'f', 2);

select * from tbcliente;

INSERT INTO tbpromotor
(AreaEspecializacion, PrimerTelefono, SegundoTelefono, Ubicacion, TbUsuario_idUsuario) 
VALUES 
('Música', 84652366, 75632569, 'San Antonio de Belén', 3);

select * from tbpromotor;

INSERT INTO tbcajero
(FechaNacimiento, Telefono, Genero, TbUsuario_idUsuario) 
VALUES 
('1978-06-25', '25639854', 'f', 4);

select * from tbcajero;




/*	INSERTS TABLA TIPO EVENTO*/
INSERT INTO tbtipoevento
(Nombre, Descripcion) 
VALUES 
('Música', 'Es el arte de combinar los sonidos de la voz humana o de los instrumentos, o de unos y otros a la vez, para crear un determinado efecto.');

INSERT INTO tbtipoevento
(Nombre, Descripcion) 
VALUES 
('Cultura', 'Es una especie de tejido social que abarca las distintas formas y expresiones de una sociedad determinada.');

INSERT INTO tbtipoevento
(Nombre, Descripcion) 
VALUES 
('Deportes', 'Es la actividad física pautada conforme a reglas y que se practica con finalidad recreativa, profesional o como medio de mejoramiento de la salud.');

INSERT INTO tbtipoevento
(Nombre, Descripcion) 
VALUES 
('Teatro', 'Es el arte que busca representar historias frente a una audiencia, combinando actuación, discurso, gestos, escenografía, música y sonido.');

INSERT INTO tbtipoevento
(Nombre, Descripcion) 
VALUES 
('Arte', 'Es el concepto que engloba todas las creaciones realizadas por el ser humano para expresar una visión sensible acerca del mundo, ya sea real o imaginario.');

SELECT * FROM tbtipoevento;

/*INSERT EN LA TABLA EVENTO*/
/*INSERT INTO tbevento
(Nombre, Descripcion, FechaEvento, CapacidadPersonas, HoraInicio, HoraFinalizacion, CostoEntrada, TbTipoEvento_idTipoEvento) 
VALUES 
('Rihanna World Tour', 'Viene Rihanna con su World Tour, un verdadero show que no te podés perder', '2016-06-16', 2102,'7:00pm', '10:00pm', 1);
*/

/*INSERTS EN LA TABLA TIPO DE TRANSACCIO*/

INSERT INTO tbtipotransaccion
(TipoTransaccion) 
VALUES 
('Compra');
#1 es de compra

INSERT INTO tbtipotransaccion
(TipoTransaccion) 
VALUES 
('Reservación');
#2 es de reservacion
select * from tbtipotransaccion;



