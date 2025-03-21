CREATE DATABASE carwahs_el_catracho;

USE carwahs_el_catracho;

CREATE TABLE Rol (
  ID INT AUTO_INCREMENT,
  Nombre VARCHAR(100),
  Descripcion VARCHAR(255),
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID)
);

CREATE TABLE Marca (
  ID INT AUTO_INCREMENT,
  Nombre VARCHAR(100),
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID)
);

CREATE TABLE Modelo (
  ID INT AUTO_INCREMENT,
  ID_Marca INT,
  Modelo VARCHAR(100),
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Marca) REFERENCES Marca(ID)
);

CREATE TABLE Clientes (
  ID INT AUTO_INCREMENT,
  Nombre VARCHAR(100),
  Correo VARCHAR(150),
  Telefono VARCHAR(20),
  Contraseña VARCHAR(255),
  Estado INT,
  URL_FOTO VARCHAR(255),
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID)
);

CREATE TABLE Cotizaciones (
  ID INT AUTO_INCREMENT,
  ID_Cliente INT,
  ID_Carro INT,
  Descripcion VARCHAR(255),
  Total DOUBLE,
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID)
);

CREATE TABLE Referencia_a_la_tarjeta (
  ID INT AUTO_INCREMENT,
  ID_CLIENTE INT,
  Nombre VARCHAR(100),
  ID_Tarjeta INT,
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_CLIENTE) REFERENCES Clientes(ID)
);

CREATE TABLE Factura (
  ID INT AUTO_INCREMENT,
  ID_contizacion INT,
  Total DOUBLE,
  Metodo_pago INT,
  ID_Tarjeta INT,
  Estado INT,
  FechaCreacion DATE,
  FechaActualizacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_contizacion) REFERENCES Cotizaciones(ID),
  FOREIGN KEY (ID_Tarjeta) REFERENCES Referencia_a_la_tarjeta(ID)
);

CREATE TABLE Empleado (
  ID INT AUTO_INCREMENT,
  Nombre VARCHAR(100),
  Correo VARCHAR(150),
  Telefono VARCHAR(20),
  Contraseña VARCHAR(255),
  Direccion VARCHAR(255),
  ID_Rol INT,
  Foto_empleado VARCHAR(255),
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Rol) REFERENCES Rol(ID)
);

CREATE TABLE Servicios (
  ID INT AUTO_INCREMENT,
  Servicio VARCHAR(100),
  Precio DOUBLE,
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID)
);

CREATE TABLE CotizacionesDetalle (
  ID INT AUTO_INCREMENT,
  ID_Cotizaciones INT,
  ID_Servicios INT,
  Nota VARCHAR(255),
  Precio DOUBLE,
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Cotizaciones) REFERENCES Cotizaciones(ID),
  FOREIGN KEY (ID_Servicios) REFERENCES Servicios(ID)
);

CREATE TABLE Trabajos (
  ID INT AUTO_INCREMENT,
  ID_CotizacionDetalle INT,
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_CotizacionDetalle) REFERENCES CotizacionesDetalle(ID)
);

CREATE TABLE TrabajoEmpleado (
  ID INT AUTO_INCREMENT,
  ID_Empleado INT,
  ID_Trabajo INT,
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Empleado) REFERENCES Empleado(ID),
  FOREIGN KEY (ID_Trabajo) REFERENCES Trabajos(ID)
);

CREATE TABLE Evidencias (
  ID INT AUTO_INCREMENT,
  ID_Trabajos INT,
  URL_FOTO VARCHAR(255),
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Trabajos) REFERENCES Trabajos(ID)
);

CREATE TABLE Ubicaciones (
  ID INT AUTO_INCREMENT,
  ID_Cliente INT,
  Nombre VARCHAR(100),
  Referecencia VARCHAR(255),
  Ubicacion VARCHAR(255),
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID)
);

CREATE TABLE Carros (
  ID INT AUTO_INCREMENT,
  ID_Cliente INT,
  Placa VARCHAR(20),
  Modelo INT,
  Año YEAR,
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID),
  FOREIGN KEY (Modelo) REFERENCES Modelo(ID)
);

CREATE TABLE Tarjetas (
  ID INT AUTO_INCREMENT,
  Numero_de_tarjeta VARCHAR(16),
  Fecha_vencimiento DATE,
  Codigo INT,
  NombreTitular VARCHAR(100),
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID)
);

/*Procedimientos almacenados Clientes*/
DELIMITER $$

CREATE PROCEDURE insertarCliente(
    IN p_nombre VARCHAR(255),
    IN p_correo VARCHAR(255),
    IN p_telefono VARCHAR(255),
    IN p_contrasena VARCHAR(255),
    IN p_foto VARCHAR(255)
)
BEGIN
    INSERT INTO Clientes (Nombre, Correo, Telefono, Contraseña, URL_FOTO, Estado, Fecha_Creacion, Fecha_Modificacion)
    VALUES (p_nombre, p_correo, p_telefono, p_contrasena, p_foto, 1, NOW(), null);
END $$

CREATE PROCEDURE actualizarCliente(
    IN p_id INT,
    IN p_nombre VARCHAR(255),
    IN p_correo VARCHAR(255),
    IN p_telefono VARCHAR(255),
    IN p_contrasena VARCHAR(255),
    IN p_foto VARCHAR(255)
)
BEGIN
    UPDATE Clientes 
    SET Nombre = p_nombre,
        Correo = p_correo,
        Telefono = p_telefono,
        Contraseña = p_contrasena,
        URL_FOTO = p_foto,
        Fecha_Modificacion = NOW()
    WHERE ID = p_id;
END $$

CREATE PROCEDURE eliminarCliente(
    IN p_id INT
)
BEGIN
    UPDATE Clientes 
    SET Estado = 0, Fecha_Modificacion = NOW()
    WHERE ID = p_id;
END $$

CREATE PROCEDURE obtenerClientes()
BEGIN
    SELECT ID, Nombre, Correo, Telefono, URL_FOTO, Estado, Fecha_Creacion, Fecha_Modificacion
    FROM Clientes
    WHERE Estado = 1;
END $$

CREATE PROCEDURE loginClientes(
  IN p_correo VARCHAR(255)
)
BEGIN
    SELECT ID, Nombre,Contraseña
    FROM Clientes
    WHERE p_correo = Correo AND Estado = 1;
END $$

CREATE PROCEDURE obtenerClientePorID(
    IN p_id INT
)
BEGIN
    SELECT ID, Nombre, Correo, Telefono, URL_FOTO, Estado, Fecha_Creacion, Fecha_Modificacion
    FROM Clientes
    WHERE ID = p_id AND Estado = 1;
END $$

DELIMITER ;



/*Procedimientos almacenados rol*/
DELIMITER $$

CREATE PROCEDURE insertarRol(
    IN p_nombre VARCHAR(255),
    IN p_descricion VARCHAR(255),
    
)
BEGIN
    INSERT INTO Clientes (Nombre, Descripcion,  Estado, Fecha_Creacion, Fecha_Modificacion)
    VALUES (p_nombre, p_descricion, 1, NOW(), null);
END $$

CREATE PROCEDURE actualizarRol(
    IN p_id INT,
    IN p_descricion VARCHAR(255),
   
)
BEGIN
    UPDATE Rol 
    SET Nombre = p_nobre,
        Descripcion = p_descricion,
        Fecha_Modificacion = NOW()
    WHERE ID = p_id;
END $$

CREATE PROCEDURE eliminarRol(
    IN p_id INT
)
BEGIN
    UPDATE Rol 
    SET Estado = 0, Fecha_Modificacion = NOW()
    WHERE ID = p_id;
END $$

CREATE PROCEDURE obtenerRol()
BEGIN
    SELECT ID, Nombre, Descripcion, Estado, Fecha_Creacion, Fecha_Modificacion
    FROM Rol
    WHERE Estado = 1;
END $$

CREATE PROCEDURE loginClientes(
  IN p_correo VARCHAR(255)
)

CREATE PROCEDURE obtenerRolPorID(
    IN p_id INT
)
BEGIN
    SELECT ID, Nombre, Descripcion, Estado, Fecha_Creacion, Fecha_Modificacion
    FROM Rol
    WHERE ID = p_id AND Estado = 1;
END $$

DELIMITER ;

/*Procedimientos almacenados empleado*/
DELIMITER $$

CREATE PROCEDURE insertarEmpleado(
    IN p_nombre VARCHAR(255),
    IN p_correo VARCHAR(255),
    IN p_telefono VARCHAR(255),
    IN p_contrasena VARCHAR(255),
    IN p_direccion VARCHAR(255),
    IN p_rol INT,
    IN p_foto VARCHAR(255)
)
BEGIN
    INSERT INTO Empleado (Nombre, Correo, Telefono, Contraseña,Direccion,ID_Rol, URL_FOTO, Estado, Fecha_Creacion, Fecha_Modificacion)
    VALUES (p_nombre, p_correo, p_telefono, p_contrasena,p_descricion,p_rol, p_foto, 1, NOW(), null);
END $$

CREATE PROCEDURE actualizarEmpleado(
    IN p_id INT,
    IN p_nombre VARCHAR(255),
    IN p_correo VARCHAR(255),
    IN p_telefono VARCHAR(255),
    IN p_contrasena VARCHAR(255),
     IN p_direccion VARCHAR(255),
    IN p_rol INT,
    IN p_foto VARCHAR(255)
)
BEGIN
    UPDATE Empleado 
    SET Nombre = p_nombre,
        Correo = p_correo,
        Telefono = p_telefono,
        Contraseña = p_contrasena,
        Direccion = p_descricion,
        ID_Rol = p_rol,
        URL_FOTO = p_foto,
        Fecha_Modificacion = NOW()
    WHERE ID = p_id;
END $$

CREATE PROCEDURE eliminarEmpleado(
    IN p_id INT
)
BEGIN
    UPDATE Empleado 
    SET Estado = 0, Fecha_Modificacion = NOW()
    WHERE ID = p_id;
END $$

CREATE PROCEDURE obtenerEmpleado()
BEGIN
    SELECT ID, Nombre, Correo, Telefono,Direccion,ID_Rol, URL_FOTO, Estado, Fecha_Creacion, Fecha_Modificacion
    FROM Empleado
    WHERE Estado = 1;
END $$

CREATE PROCEDURE loginEmpleado(
  IN p_correo VARCHAR(255)
)
BEGIN
    SELECT ID, Nombre,Contraseña
    FROM Empleado
    WHERE p_correo = Correo AND Estado = 1;
END $$

CREATE PROCEDURE obtenerEmpleadoPorID(
    IN p_id INT
)
BEGIN
    SELECT ID, Nombre, Correo, Telefono,Direccion,ID_Rol URL_FOTO, Estado, Fecha_Creacion, Fecha_Modificacion
    FROM Empleado
    WHERE ID = p_id AND Estado = 1;
END $$

DELIMITER ;








/*Triggers*/

/*Vistas*/