use og_tickets;

select * from tbusuario;

UPDATE tbusuario
SET email='natymata@gmail.com', password= '$2y$10$QQHLQtb/KL53dOhbWrJvWOBmG9ZI2XfH0llkiqvZPUe'
WHERE idUsuario=2;

INSERT INTO tbusuario
(PrimerNombre, PrimerApellido, Cedula, Email, password, TbTipoUsuario_idTipoUsuario) 
VALUES 
('Juana', 'De Arco', 265868745, 'juana@dearco.com', '123', 2);

INSERT INTO tbusuario
(PrimerNombre, PrimerApellido, Cedula, Email, password, TbTipoUsuario_idTipoUsuario) 
VALUES 
('oxyGen', 'Admin', 000000000, 'oxyGenAdmin@gmail.com', 'admin', 1);

INSERT INTO tbusuario
(PrimerNombre, PrimerApellido, Cedula, Email, password, TbTipoUsuario_idTipoUsuario) 
VALUES 
('Ariana', 'Aguilar', 156482659, 'ari@cenfo.com', '123', 3);

INSERT INTO tbusuario
(PrimerNombre, PrimerApellido, Cedula, Email, password, TbTipoUsuario_idTipoUsuario) 
VALUES 
('Josefita', 'Duarte', 652148965, 'josefita@yahoo.com', '123', 4);









