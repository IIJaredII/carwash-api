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
  Latitud DOUBLE,
  Longitud DOUBLE,
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
    IN p_descripcion VARCHAR(255)
)
BEGIN
    INSERT INTO Rol (Nombre, Descripcion, Estado, Fecha_Creacion, Fecha_Modificacion)
    VALUES (p_nombre, p_descripcion, 1, NOW(), null);
END $$

CREATE PROCEDURE actualizarRol(
    IN p_id INT,
    IN p_nombre VARCHAR(255),
    IN p_descripcion VARCHAR(255)
)
BEGIN
    UPDATE Rol 
    SET Nombre = p_nombre,
        Descripcion = p_descripcion,
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
    INSERT INTO Empleado (Nombre, Correo, Telefono, Contraseña,Direccion,ID_Rol, Foto_empleado, Estado, Fecha_Creacion, Fecha_Modificacion)
    VALUES (p_nombre, p_correo, p_telefono, p_contrasena,p_direccion,p_rol, p_foto, 1, NOW(), null);
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
        Direccion = p_direccion,
        ID_Rol = p_rol,
        Foto_empleado = p_foto,
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
    SELECT ID, Nombre, Correo, Telefono,Direccion,ID_Rol, Foto_empleado, Estado, Fecha_Creacion, Fecha_Modificacion
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
    SELECT ID, Nombre, Correo, Telefono,Direccion,ID_Rol , Foto_empleado, Estado, Fecha_Creacion, Fecha_Modificacion
    FROM Empleado
    WHERE ID = p_id AND Estado = 1;
END $$

DELIMITER ;

DELIMITER $$

-- Procedimiento para obtener todos los carros de un cliente por su ID
CREATE PROCEDURE ObtenerCarrosPorCliente(
    IN p_ID_Cliente INT
)
BEGIN
    SELECT * FROM Carros WHERE ID_Cliente = p_ID_Cliente;
END $$

CREATE PROCEDURE ObtenerCarroPorID(
    IN p_ID INT
)
BEGIN
    SELECT * FROM Carros WHERE ID = p_ID;
END $$


CREATE PROCEDURE RegistrarCarro(
    IN p_ID_Cliente INT,
    IN p_Placa VARCHAR(20),
    IN p_Modelo INT,
    IN p_Año YEAR
)
BEGIN
    INSERT INTO Carros (ID_Cliente, Placa, Modelo, Año, Estado, Fecha_Creacion, Fecha_Modificacion)
    VALUES (p_ID_Cliente, p_Placa, p_Modelo, p_Año, 1, NOW(), null);
END $$


CREATE PROCEDURE ActualizarCarro(
    IN p_ID INT,
    IN p_ID_Cliente INT,
    IN p_Placa VARCHAR(20),
    IN p_Modelo INT,
    IN p_Año YEAR
)
BEGIN
    UPDATE Carros 
    SET ID_Cliente = p_ID_Cliente, 
        Placa = p_Placa, 
        Modelo = p_Modelo, 
        Año = p_Año, 
        Fecha_Modificacion = NOW()
    WHERE ID = p_ID;
END $$


CREATE PROCEDURE eliminarCarro(
    IN p_ID INT
)
BEGIN
    UPDATE Carros 
    SET Estado = 0, Fecha_Modificacion = NOW()
    WHERE ID = p_ID;
END $$  


DELIMITER ;

DELIMITER $$

-- Obtener los modelos por el ID de la marca
CREATE PROCEDURE ObtenerModelosPorMarca(
    IN p_ID_Marca INT
)
BEGIN
    SELECT * FROM Modelo WHERE ID_Marca = p_ID_Marca;
END $$

DELIMITER ;

DELIMITER $$

-- Procedimiento para registrar una nueva ubicación
CREATE PROCEDURE RegistrarUbicacion(
    IN p_ID_Cliente INT,
    IN p_Nombre VARCHAR(100),
    IN p_Referencia VARCHAR(255),
    IN p_Ubicacion VARCHAR(255),
    IN p_Latitud DOUBLE,
    IN p_Longitud DOUBLE
)
BEGIN
    INSERT INTO Ubicaciones (ID_Cliente, Nombre, Referecencia, Ubicacion, Latitud, Longitud, Estado, Fecha_Creacion, Fecha_Modificacion)
    VALUES (p_ID_Cliente, p_Nombre, p_Referencia, p_Ubicacion, p_Latitud, p_Longitud, 1, NOW(), null);
END $$


CREATE PROCEDURE ActualizarUbicacion(
    IN p_ID INT,
    IN p_ID_Cliente INT,
    IN p_Nombre VARCHAR(100),
    IN p_Referencia VARCHAR(255),
    IN p_Ubicacion VARCHAR(255),
    IN p_Latitud DOUBLE,
    IN p_Longitud DOUBLE
)
BEGIN
    UPDATE Ubicaciones 
    SET ID_Cliente = p_ID_Cliente,
        Nombre = p_Nombre,
        Referecencia = p_Referencia,
        Ubicacion = p_Ubicacion,
        Latitud = p_Latitud,
        Longitud = p_Longitud,
        Fecha_Modificacion = NOW()
    WHERE ID = p_ID;
END $$


CREATE PROCEDURE eliminarUbicacion(
    IN p_ID INT
)
BEGIN
    UPDATE Ubicaciones 
    SET Estado = 0, Fecha_Modificacion = NOW()
    WHERE ID = p_ID;
END $$  


DELIMITER ;

-- Llenar la tabla de Marcas utilizados en Honduras
INSERT INTO Marca (Nombre, Estado, Fecha_Creacion, Fecha_Modificacion) VALUES
('Toyota', 1, CURDATE(), CURDATE()),
('Nissan', 1, CURDATE(), CURDATE()),
('Honda', 1, CURDATE(), CURDATE()),
('Hyundai', 1, CURDATE(), CURDATE()),
('Kia', 1, CURDATE(), CURDATE()),
('Ford', 1, CURDATE(), CURDATE()),
('Chevrolet', 1, CURDATE(), CURDATE()),
('Mazda', 1, CURDATE(), CURDATE()),
('Volkswagen', 1, CURDATE(), CURDATE()),
('Mitsubishi', 1, CURDATE(), CURDATE()),
('Suzuki', 1, CURDATE(), CURDATE()),
('Isuzu', 1, CURDATE(), CURDATE()),
('Jeep', 1, CURDATE(), CURDATE()),
('Dodge', 1, CURDATE(), CURDATE()),
('RAM', 1, CURDATE(), CURDATE()),
('Subaru', 1, CURDATE(), CURDATE()),
('Peugeot', 1, CURDATE(), CURDATE()),
('Renault', 1, CURDATE(), CURDATE()),
('Fiat', 1, CURDATE(), CURDATE()),
('Changan', 1, CURDATE(), CURDATE()),
('Chery', 1, CURDATE(), CURDATE()),
('Great Wall', 1, CURDATE(), CURDATE()),
('Geely', 1, CURDATE(), CURDATE()),
('BYD', 1, CURDATE(), CURDATE()),
('JAC', 1, CURDATE(), CURDATE()),
('MG', 1, CURDATE(), CURDATE()),
('Lexus', 1, CURDATE(), CURDATE()),
('Acura', 1, CURDATE(), CURDATE()),
('Mercedes-Benz', 1, CURDATE(), CURDATE()),
('BMW', 1, CURDATE(), CURDATE()),
('Audi', 1, CURDATE(), CURDATE()),
('Volvo', 1, CURDATE(), CURDATE()),
('Land Rover', 1, CURDATE(), CURDATE()),
('Jaguar', 1, CURDATE(), CURDATE()),
('Porsche', 1, CURDATE(), CURDATE()),
('Tesla', 1, CURDATE(), CURDATE()),
('Infiniti', 1, CURDATE(), CURDATE()),
('Cadillac', 1, CURDATE(), CURDATE()),
('Buick', 1, CURDATE(), CURDATE()),
('Lincoln', 1, CURDATE(), CURDATE()),
('GMC', 1, CURDATE(), CURDATE()),
('SsangYong', 1, CURDATE(), CURDATE());

-- Llenar la tabla de modelos utilizados en Honduras
INSERT INTO Modelo (ID_Marca, Modelo, Estado, Fecha_Creacion, Fecha_Modificacion) VALUES
(1, 'Corolla', 1, CURDATE(), CURDATE()),
(1, 'Hilux', 1, CURDATE(), CURDATE()),
(1, 'Rav4', 1, CURDATE(), CURDATE()),
(2, 'Sentra', 1, CURDATE(), CURDATE()),
(2, 'Frontier', 1, CURDATE(), CURDATE()),
(2, 'Versa', 1, CURDATE(), CURDATE()),
(3, 'Civic', 1, CURDATE(), CURDATE()),
(3, 'CR-V', 1, CURDATE(), CURDATE()),
(3, 'Accord', 1, CURDATE(), CURDATE()),
(4, 'Tucson', 1, CURDATE(), CURDATE()),
(4, 'Santa Fe', 1, CURDATE(), CURDATE()),
(5, 'Sportage', 1, CURDATE(), CURDATE()),
(5, 'Sorento', 1, CURDATE(), CURDATE()),
(6, 'Silverado', 1, CURDATE(), CURDATE()),
(6, 'Equinox', 1, CURDATE(), CURDATE()),
(7, 'Ranger', 1, CURDATE(), CURDATE()),
(7, 'Escape', 1, CURDATE(), CURDATE()),
(8, 'CX-5', 1, CURDATE(), CURDATE()),
(8, 'Mazda 3', 1, CURDATE(), CURDATE()),
(9, 'Lancer', 1, CURDATE(), CURDATE()),
(9, 'Outlander', 1, CURDATE(), CURDATE()),
(10, 'Jetta', 1, CURDATE(), CURDATE()),
(10, 'Tiguan', 1, CURDATE(), CURDATE()),
(11, 'Swift', 1, CURDATE(), CURDATE()),
(12, 'Wrangler', 1, CURDATE(), CURDATE());



