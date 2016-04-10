/*
Pasos para crear la base de datos: 
1- poner en su apache el puerto: 3308 como default para mySQL
2- crear una nueva conexion, asignarle el host 127.0.0.1 con el puerto 1338.
3- quitar el comentario a la línea 13 que dice create user....
4- marcar de la linea 11 a la 19 y correrlo
5-Ir marcando tabla por tabla y correr cada script, si tratan de correr todo les va a dar errores
*/
#drop database OG_Tickets;

create database OG_Tickets;

use  OG_Tickets;
#crear el usuario
#CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
#dar privilefios al usuario
GRANT ALL PRIVILEGES ON OG_Tickets.* TO 'admin'@'localhost';
#actualizar los privilegios
FLUSH PRIVILEGES;
#select user, host from mysql.user where user= 'admin';

/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbTipoUsuario`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbTipoUsuario` (
  `idTipoUsuario` INT NOT NULL AUTO_INCREMENT,
  `prefijo` VARCHAR(10) NOT NULL DEFAULT 'ut',
  `appId` VARCHAR(100) GENERATED ALWAYS AS (concat(prefijo,idTipoUsuario)) VIRTUAL,
  `NombreTipoUsuario` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTipoUsuario`));
  

/*-- ----------------------------------------------------
-- Table `OG_Tickets`.`TbUsuario`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbUsuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `prefijo` VARCHAR(10) NOT NULL DEFAULT 'us',
  `appId` VARCHAR(100) GENERATED ALWAYS AS (concat(prefijo,idUsuario)) VIRTUAL,
  `PrimerNombre` VARCHAR(45) NOT NULL,
  `SegundoNombre` VARCHAR(45) NULL,
  `PrimerApellido` VARCHAR(45) NOT NULL,
  `SegundoApellido` VARCHAR(45) NULL,
  `NombreCompleto` VARCHAR(255) GENERATED ALWAYS AS (concat(PrimerNombre,' ',SegundoNombre, ' ',PrimerApellido,' ',SegundoApellido)) VIRTUAL,
  `Cedula` VARCHAR(15) NOT NULL,
  `Email` VARCHAR(80) NOT NULL,
  `Contraseña` VARCHAR(255) NOT NULL,
  `Activo` TINYINT(1) NOT NULL DEFAULT 1,
  `TbTipoUsuario_idTipoUsuario` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  INDEX `fk_TbUsuario_TbTipoUsuario_idx` (`TbTipoUsuario_idTipoUsuario` ASC),
  UNIQUE INDEX `idUsuario_UNIQUE` (`idUsuario` ASC),
  CONSTRAINT `fk_TbUsuario_TbTipoUsuario`
    FOREIGN KEY (`TbTipoUsuario_idTipoUsuario`)
    REFERENCES `OG_Tickets`.`TbTipoUsuario` (`idTipoUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbCliente`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbCliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `prefijo` VARCHAR(45) NOT NULL DEFAULT 'cl',
  `appId` VARCHAR(100) GENERATED ALWAYS AS (concat(prefijo,idCliente)) VIRTUAL,
  `nombreRol` VARCHAR(100) NOT NULL DEFAULT 'Cliente',
  `FechaNacimiento` DATE NOT NULL,
  #`Edad` TINYINT(2) GENERATED ALWAYS AS (TIMESTAMPDIFF(YEAR, FechaNacimiento, CURDATE())) VIRTUAL,
  `Telefono` DECIMAL(8) NOT NULL,
  `Genero` CHAR(1) NOT NULL,
  `Foto` BLOB NULL,
  `Discapacidad` TINYINT(1) NOT NULL DEFAULT 0,
  `TarjetaAsociada` DECIMAL(20) NULL,
  `TbUsuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idCliente`),
  INDEX `fk_TbCliente_TbUsuario1_idx` (`TbUsuario_idUsuario` ASC),
  UNIQUE INDEX `idCliente_UNIQUE` (`idCliente` ASC),
  CONSTRAINT `fk_TbCliente_TbUsuario1`
    FOREIGN KEY (`TbUsuario_idUsuario`)
    REFERENCES `OG_Tickets`.`TbUsuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbAdministrador`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbAdministrador` (
  `idAdmin` INT NOT NULL AUTO_INCREMENT,
  `prefijo` VARCHAR(10) NOT NULL DEFAULT 'ad',
  `appId` VARCHAR(10) GENERATED ALWAYS AS (concat(prefijo,idAdmin)) VIRTUAL,
  `nombreRol` VARCHAR(100) NOT NULL DEFAULT 'Administrador',
  `Contraseña` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `TbTipoUsuario_idTipoUsuario` INT NOT NULL,
  PRIMARY KEY (`idAdmin`),
  INDEX `fk_TbAdministrador_TbTipoUsuario1_idx` (`TbTipoUsuario_idTipoUsuario` ASC),
  UNIQUE INDEX `idAdmin_UNIQUE` (`idAdmin` ASC),
  CONSTRAINT `fk_TbAdministrador_TbTipoUsuario1`
    FOREIGN KEY (`TbTipoUsuario_idTipoUsuario`)
    REFERENCES `OG_Tickets`.`TbTipoUsuario` (`idTipoUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbPromotor`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbPromotor` (
  `idPromotor` INT NOT NULL AUTO_INCREMENT,
  `prefijo` VARCHAR(10) NOT NULL DEFAULT 'pr',
  `appId` VARCHAR(20) GENERATED ALWAYS AS (concat(prefijo,idPromotor)) VIRTUAL,
  `nombreRol` VARCHAR(30) NOT NULL DEFAULT 'Promotor',
  `AreaEspecializacion` VARCHAR(60) NOT NULL,
  `PrimerTelefono` DECIMAL(8) NOT NULL,
  `SegundoTelefono` DECIMAL(8) NULL,
  `Ubicacion` VARCHAR(255) NOT NULL,
  `TbUsuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idPromotor`),
  INDEX `fk_TbPromotor_TbUsuario1_idx` (`TbUsuario_idUsuario` ASC),
  CONSTRAINT `fk_TbPromotor_TbUsuario1`
    FOREIGN KEY (`TbUsuario_idUsuario`)
    REFERENCES `OG_Tickets`.`TbUsuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbCajero`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbCajero` (
  `idCajero` INT NOT NULL AUTO_INCREMENT,
  `prefijo` VARCHAR(10) NOT NULL DEFAULT 'cs',
  `appId` VARCHAR(100) GENERATED ALWAYS AS (concat(prefijo,idCajero)) VIRTUAL,
  `nombreRol` VARCHAR(30) NOT NULL DEFAULT 'Cajero',
  `FechaNacimiento` DATE NOT NULL,
  `Telefono` DECIMAL(8) NOT NULL,
  `Genero` CHAR(1) NOT NULL,
  `TbUsuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idCajero`),
  INDEX `fk_TbCajero_TbUsuario1_idx` (`TbUsuario_idUsuario` ASC),
  UNIQUE INDEX `idCajero_UNIQUE` (`idCajero` ASC),
  CONSTRAINT `fk_TbCajero_TbUsuario1`
    FOREIGN KEY (`TbUsuario_idUsuario`)
    REFERENCES `OG_Tickets`.`TbUsuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbTipoEvento`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbTipoEvento` (
  `idTipoEvento` INT NOT NULL AUTO_INCREMENT,
  `prefijo` VARCHAR(10) NOT NULL DEFAULT 'et',
  `appId` VARCHAR(100) GENERATED ALWAYS AS (concat(prefijo,idTipoEvento)) VIRTUAL,
  `Nombre` VARCHAR(255) NOT NULL,
  `Descripcion` VARCHAR(255) NOT NULL,
  `Foto` BLOB NULL,
  `Activo` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`idTipoEvento`),
  UNIQUE INDEX `idTipoEvento_UNIQUE` (`idTipoEvento` ASC));


-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbEvento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbEvento` (
  `idEvento` INT NOT NULL AUTO_INCREMENT,
  `prefijo` VARCHAR(10) NOT NULL DEFAULT 'ev',
  `appId` VARCHAR(100) GENERATED ALWAYS AS (concat(prefijo,idEvento)) VIRTUAL,
  `Nombre` VARCHAR(100) NOT NULL,
  `Descripcion` VARCHAR(255) NOT NULL,
  `FechaEvento` DATE NOT NULL,
  `CapacidadPersonas` INT NOT NULL,
  `HoraInicio` DATETIME NOT NULL,
  `HoraFinalizacion` DATETIME NOT NULL,
  `CostoEntrada` INT NOT NULL,
  `Foto` BLOB NULL,
  `Activo` TINYINT(1) NOT NULL DEFAULT 1,
  `TbTipoEvento_idTipoEvento` INT NOT NULL,
  PRIMARY KEY (`idEvento`),
  INDEX `fk_TbEvento_TbTipoEvento1_idx` (`TbTipoEvento_idTipoEvento` ASC),
  CONSTRAINT `fk_TbEvento_TbTipoEvento1`
    FOREIGN KEY (`TbTipoEvento_idTipoEvento`)
    REFERENCES `OG_Tickets`.`TbTipoEvento` (`idTipoEvento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbSitio`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbSitio` (
  `idSitio` INT NOT NULL AUTO_INCREMENT,
  `prefijo` VARCHAR(10) NOT NULL DEFAULT 'si',
  `appId` VARCHAR(100) GENERATED ALWAYS AS (concat(prefijo,idSitio)) VIRTUAL,
  `Nombre` VARCHAR(80) NOT NULL,
  `PrimerTelefono` INT(8) NOT NULL,
  `SegundoTelefono` INT(8) NULL,
  `Capacidad` INT NOT NULL,
  `UbicacionLongitud` FLOAT NOT NULL,
  `UbicacionLatitud` FLOAT NOT NULL,
  `Direccion` VARCHAR(255) NOT NULL,
  `Foto` BLOB NULL,
  `Activo` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`idSitio`));

/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbTipoTransaccion`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbTipoTransaccion` (
  `idTipoTransaccion` INT NOT NULL AUTO_INCREMENT,
  `prefijo` VARCHAR(10) NOT NULL DEFAULT 'tt',
  `appId` VARCHAR(100) GENERATED ALWAYS AS (concat(prefijo,idTipoTransaccion)) VIRTUAL,
  `TipoTransaccion` TINYINT(1) NOT NULL DEFAULT 1, /*DEFAULT es compra 0 seria reservacion*/
  PRIMARY KEY (`idTipoTransaccion`));


/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbTransaccion`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbTransaccion` (
  `idTransaccion` INT NOT NULL AUTO_INCREMENT,
  `prefijo` VARCHAR(10) NOT NULL DEFAULT 'tr',
  `appId` VARCHAR(100) GENERATED ALWAYS AS (concat(prefijo,idTransaccion)) VIRTUAL,
  `Activo` TINYINT(1) NOT NULL DEFAULT 1, /*default 1 de activo, las reservaciones pueden pasar a estar inactivas*/
  `Codigo` VARCHAR(100) NOT NULL,
  `CantidadEspacios` INT NOT NULL,
  `TbTipoTransaccion_idTipoTransaccion` INT NOT NULL,
  PRIMARY KEY (`idTransaccion`),
  INDEX `fk_TbTransaccion_TbTipoTransaccion1_idx` (`TbTipoTransaccion_idTipoTransaccion` ASC),
  CONSTRAINT `fk_TbTransaccion_TbTipoTransaccion1`
    FOREIGN KEY (`TbTipoTransaccion_idTipoTransaccion`)
    REFERENCES `OG_Tickets`.`TbTipoTransaccion` (`idTipoTransaccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbTransaccionPorAsiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbAsientosPorTransaccion` (
  `index` INT NOT NULL AUTO_INCREMENT,
  `idAsiento` VARCHAR(20) NOT NULL,
  `TbTransaccion_idTransaccion` INT NOT NULL,
  PRIMARY KEY (`index`),
  CONSTRAINT `fk_TbAsientosPorTransaccion_TbTransaccion1`
    FOREIGN KEY (`TbTransaccion_idTransaccion`)
    REFERENCES `OG_Tickets`.`TbTransaccion` (`idTransaccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    

/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbTransaccionPorCliente`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbTransaccionPorCliente` (
  `TbCliente_idCliente` INT NOT NULL,
  `TbTransaccion_idTransaccion` INT NOT NULL,
  CONSTRAINT `fk_TbTransaccionPorCliente_TbCliente1`
    FOREIGN KEY (`TbCliente_idCliente`)
    REFERENCES `OG_Tickets`.`TbCliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TbTransaccionPorCliente_TbTransaccion1`
    FOREIGN KEY (`TbTransaccion_idTransaccion`)
    REFERENCES `OG_Tickets`.`TbTransaccion` (`idTransaccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbEventoPorSitio`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbEventoPorSitio` (
  `TbSitio_idSitio` INT NOT NULL,
  `TbEvento_idEvento` INT NOT NULL,
  INDEX `fk_TbEventoPorSitio_TbSitio1_idx` (`TbSitio_idSitio` ASC),
  INDEX `fk_TbEventoPorSitio_TbEvento1_idx` (`TbEvento_idEvento` ASC),
  CONSTRAINT `fk_TbEventoPorSitio_TbSitio1`
    FOREIGN KEY (`TbSitio_idSitio`)
    REFERENCES `OG_Tickets`.`TbSitio` (`idSitio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TbEventoPorSitio_TbEvento1`
    FOREIGN KEY (`TbEvento_idEvento`)
    REFERENCES `OG_Tickets`.`TbEvento` (`idEvento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    
/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbButacasPorSitioPorSeccion`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbButacasPorSitioPorSeccion` (
  `idSeccion` VARCHAR(45) NOT NULL,
  `rowAccount` INT NOT NULL,
  `colAcount` INT NOT NULL,
  `TbSitio_idSitio` INT NOT NULL,
  PRIMARY KEY (`TbSitio_idSitio`,`idSeccion`),
  CONSTRAINT `fk_TbButacasPorSitioPorSeccion_TbSitio1`
    FOREIGN KEY (`TbSitio_idSitio`)
    REFERENCES `OG_Tickets`.`TbSitio` (`idSitio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    


/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbButacasPorSitioPorEvento`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbButacasPorSitioPorEvento` (
  `idEvento` INT NOT NULL,
  `idSitio` INT NOT NULL,
  `idSeccion` INT NOT NULL,
  `idAsiento` VARCHAR(45) NOT NULL,
  `Activo` TINYINT(1) NOT NULL DEFAULT 1, /*default activo 1, si se cancela una reserva debe pasar a 0*/
  PRIMARY KEY (`idEvento`, `idSitio`,`idSeccion`,`idAsiento`));
  
  
/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbEventoPorPromotor`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbEventoPorPromotor` (
  `TbPromotor_idPromotor` INT NOT NULL,
  `TbEvento_idEvento` INT NOT NULL,
  INDEX `fk_TbEventoPorPromotor_TbPromotor1_idx` (`TbPromotor_idPromotor` ASC),
  INDEX `fk_TbEventoPorPromotor_TbEvento1_idx` (`TbEvento_idEvento` ASC),
  CONSTRAINT `fk_TbEventoPorPromotor_TbPromotor1`
    FOREIGN KEY (`TbPromotor_idPromotor`)
    REFERENCES `OG_Tickets`.`TbPromotor` (`idPromotor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TbEventoPorPromotor_TbEvento1`
    FOREIGN KEY (`TbEvento_idEvento`)
    REFERENCES `OG_Tickets`.`TbEvento` (`idEvento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbTransaccionPorEvento`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbTransaccionPorEvento` (
  `TbTransaccion_idTransaccion` INT NOT NULL,
  `TbEvento_idEvento` INT NOT NULL,
  INDEX `fk_TbTransaccionPorEvento_TbTransaccion1_idx` (`TbTransaccion_idTransaccion` ASC),
  INDEX `fk_TbTransaccionPorEvento_TbEvento1_idx` (`TbEvento_idEvento` ASC),
  CONSTRAINT `fk_TbTransaccionPorEvento_TbTransaccion1`
    FOREIGN KEY (`TbTransaccion_idTransaccion`)
    REFERENCES `OG_Tickets`.`TbTransaccion` (`idTransaccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TbTransaccionPorEvento_TbEvento1`
    FOREIGN KEY (`TbEvento_idEvento`)
    REFERENCES `OG_Tickets`.`TbEvento` (`idEvento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


/*-- -----------------------------------------------------
-- Table `OG_Tickets`.`TbSolicitudRegistroPromotor`
-- -----------------------------------------------------*/
CREATE TABLE IF NOT EXISTS `OG_Tickets`.`TbSolicitudRegistroPromotor` (
  `idSolicitudRegistroPromotor` INT NOT NULL AUTO_INCREMENT,
  `prefijo` VARCHAR(10) NOT NULL DEFAULT 'rq',
  `appId` VARCHAR(100) GENERATED ALWAYS AS (concat(prefijo,idSolicitudRegistroPromotor)) VIRTUAL,
  `Approved` TINYINT(1) NOT NULL DEFAULT 0,
  `PeddingCheck` TINYINT(1) NOT NULL DEFAULT 1,
  `PrimerNombre` VARCHAR(45) NULL,
  `SegundoNombre` VARCHAR(45) NULL,
  `PrimerApellido` VARCHAR(45) NULL,
  `SegundoApellido` VARCHAR(45) NULL,
  `nombreJuridico` VARCHAR(45) NULL,
  `Cedula` VARCHAR(15) NOT NULL,
  `Email` VARCHAR(80) NOT NULL,
  `Contraseña` VARCHAR(255) NOT NULL,
  `AreaEspecializacion` VARCHAR(60) NOT NULL,
  `PrimerTelefono` DECIMAL(8) NOT NULL,
  `SegundoTelefono` DECIMAL(8) NULL,
  `Ubicacion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idSolicitudRegistroPromotor`));


