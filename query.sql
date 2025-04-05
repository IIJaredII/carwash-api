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
  Fecha_Cita DATE,
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
  ID_cotizacion INT,
  Total DOUBLE,
  Metodo_pago INT,
  ID_Tarjeta INT,
  Estado INT,
  FechaCreacion DATE,
  FechaActualizacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_cotizacion) REFERENCES Cotizaciones(ID),
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

CREATE TABLE CategoriaServicios (
  ID INT AUTO_INCREMENT,
  Nombre VARCHAR(100),
  Descripcion VARCHAR(255),
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID)
);

CREATE TABLE Servicios (
  ID INT AUTO_INCREMENT,
  Servicio VARCHAR(100),
  Precio DOUBLE,
  ID_Categoria INT,
  Estado INT,
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Categoria) REFERENCES CategoriaServicios(ID)
);


CREATE TABLE CotizacionesDetalle (
  ID INT AUTO_INCREMENT,
  ID_Cotizaciones INT,
  ID_Servicios INT,
  NotaCliente VARCHAR(255),
  NotaAdmin VARCHAR(255),
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
  URL_Multimedia VARCHAR(255),
  Observacion VARCHAR(255),
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
  Referencia VARCHAR(255),
  Longitud DOUBLE,
  Latitud DOUBLE,
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

/*Procedimientos almacenados Servicios*/
DELIMITER $$
CREATE PROCEDURE insertarServicio(
    IN p_servicio VARCHAR(255),
    IN p_precio DOUBLE,
    IN p_id_categoria INT
)
BEGIN
    INSERT INTO Servicios (Servicio, Precio, ID_Categoria, Estado, Fecha_Creacion, Fecha_Modificacion)
    VALUES (p_servicio, p_precio, p_id_categoria, 1, NOW(), NULL);
END $$ 

CREATE PROCEDURE actualizarServicio(
    IN p_id INT,
    IN p_servicio VARCHAR(255),
    IN p_precio DOUBLE,
    IN p_id_categoria INT
)
BEGIN
    UPDATE Servicios 
    SET Servicio = p_servicio,
        Precio = p_precio,
        ID_Categoria = p_id_categoria,
        Fecha_Modificacion = NOW()
    WHERE ID = p_id;
END $$ 

CREATE PROCEDURE eliminarServicio(
    IN p_id INT
)
BEGIN
    UPDATE Servicios 
    SET Estado = 0, Fecha_Modificacion = NOW()
    WHERE ID = p_id;
END $$ 

CREATE PROCEDURE obtenerServicios()
BEGIN
    SELECT ID, Servicio, Precio, ID_Categoria
    FROM Servicios
    WHERE Estado = 1;
END $$ 

CREATE PROCEDURE obtenerServicioPorID(
    IN p_id INT
)
BEGIN
    SELECT ID, Servicio, Precio, ID_Categoria
    FROM Servicios
    WHERE ID = p_id AND Estado = 1;
END $$ 

DELIMITER ;

/*Procedimientos almacenados categorias*/
DELIMITER $$

CREATE PROCEDURE insertarCategoria(
    IN p_nombre VARCHAR(255),
    IN p_descripcion VARCHAR(255)
)
BEGIN
    INSERT INTO CategoriaServicios (Nombre, Descripcion, Estado, Fecha_Creacion, Fecha_Modificacion)
    VALUES (p_nombre, p_descripcion, 1, NOW(), NULL);
END $$ 

CREATE PROCEDURE actualizarCategoria(
    IN p_id INT,
    IN p_nombre VARCHAR(255),
    IN p_descripcion VARCHAR(255)
)
BEGIN
    UPDATE CategoriaServicios 
    SET Nombre = p_nombre,
        Descripcion = p_descripcion,
        Fecha_Modificacion = NOW()
    WHERE ID = p_id;
END $$ 

CREATE PROCEDURE eliminarCategoria(
    IN p_id INT
)
BEGIN
    UPDATE CategoriaServicios 
    SET Estado = 0, Fecha_Modificacion = NOW()
    WHERE ID = p_id;
END $$ 

CREATE PROCEDURE obtenerCategorias()
BEGIN
    SELECT ID, Nombre, Descripcion
    FROM CategoriaServicios
    WHERE Estado = 1;
END $$ 

CREATE PROCEDURE obtenerCategoriaPorID(
    IN p_id INT
)
BEGIN
    SELECT ID, Nombre, Descripcion
    FROM CategoriaServicios
    WHERE ID = p_id AND Estado = 1;
END $$ 



/*Procedimientos almacenados rol*/
DELIMITER $$
CREATE PROCEDURE insertarRol(
    IN p_nombre VARCHAR(255),
    IN p_descripcion VARCHAR(255)
    
)
BEGIN
    INSERT INTO Rol (Nombre, Descripcion,  Estado, Fecha_Creacion, Fecha_Modificacion)
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
    SELECT ID, Nombre, Descripcion
    FROM Rol
    WHERE Estado = 1;
END $$


CREATE PROCEDURE obtenerRolPorID(
    IN p_id INT
)
BEGIN
    SELECT ID, Nombre, Descripcion
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
        Direccion = p_direccion,
        ID_Rol = p_rol,
        Foto_empleado = p_foto,
        Fecha_Modificacion = NOW()
    WHERE ID = p_id;

    IF p_contrasena <> '' THEN
        UPDATE Empleado
        SET Contraseña = p_contrasena
        WHERE ID = p_id;
    END IF;
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
    SELECT e.ID, e.Nombre, e.Contraseña, e.ID_Rol AS Rol
    FROM empleado e
    WHERE e.Correo = p_correo AND e.Estado = 1;
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

/*
Solo funciona con mysql, no con mariadb
DELIMITER $$

CREATE PROCEDURE insertarCotizacion(
    IN p_idCliente INT,
    IN p_idCarro INT,
    IN p_descripcion TEXT,
    IN p_fecha_cita DATE,
    IN p_detalles JSON 
)
BEGIN
    DECLARE v_idCotizacion INT;

    START TRANSACTION;
    
    -- Insertar en la tabla maestro
    INSERT INTO Cotizaciones (ID_Cliente, ID_Carro, Descripcion, Fecha_Cita)
    VALUES (p_idCliente, p_idCarro, p_descripcion,p_fecha_cita);

    -- Obtener el ID de la cotización recién insertada
    SET v_idCotizacion = LAST_INSERT_ID();

    -- Insertar detalles usando JSON
    INSERT INTO CotizacionesDetalle (ID_Cotizaciones, ID_Servicios, NotaCliente, Precio)
    SELECT 
        v_idCotizacion, 
        IFNULL(JSON_UNQUOTE(JSON_EXTRACT(d.value, '$.idServicio')), 0), 
        IFNULL(JSON_UNQUOTE(JSON_EXTRACT(d.value, '$.notaCliente')), ''), 
        IFNULL(JSON_UNQUOTE(JSON_EXTRACT(d.value, '$.precio')), 0)
    FROM JSON_TABLE(p_detalles, '$[*]') d;

    COMMIT;
END $$
DELIMITER ;
*/

DELIMITER $$

CREATE PROCEDURE insertarCotizacion(
    IN p_idCliente INT,
    IN p_idCarro INT,
    IN p_descripcion TEXT,
    IN p_fecha_cita DATE,
    IN p_detalles JSON
)
BEGIN
    DECLARE v_idCotizacion INT;
    DECLARE v_totalDetalles INT;
    DECLARE v_index INT DEFAULT 0;
    
    START TRANSACTION;

    -- Insertar en la tabla Cotizaciones (maestro)
    INSERT INTO Cotizaciones (ID_Cliente, ID_Carro, Descripcion, Fecha_Cita,Estado)
    VALUES (p_idCliente, p_idCarro, p_descripcion, p_fecha_cita,5);

    -- Obtener el ID de la cotización recién insertada
    SET v_idCotizacion = LAST_INSERT_ID();

    -- Obtener la cantidad de elementos en el JSON
    SET v_totalDetalles = JSON_LENGTH(p_detalles);

    -- Loop para insertar cada detalle
    WHILE v_index < v_totalDetalles DO
        INSERT INTO CotizacionesDetalle (ID_Cotizaciones, ID_Servicios, NotaCliente, Precio)
        VALUES (
            v_idCotizacion,
            JSON_UNQUOTE(JSON_EXTRACT(p_detalles, CONCAT('$[', v_index, '].idServicio'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_detalles, CONCAT('$[', v_index, '].notaCliente'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_detalles, CONCAT('$[', v_index, '].precio')))
        );

        SET v_index = v_index + 1;
    END WHILE;

    COMMIT;
END $$

CREATE PROCEDURE obtenerCotizacionPorId(
    IN p_id INT,
)
BEGIN
    SELECT ID, ID_Cliente,ID_Carro,Descripcion,Fecha_Cita,Estado
    FROM Cotizaciones
    WHERE ID = p_id
END $$

CREATE PROCEDURE obtenerDetallesDeCotizacion(
    IN p_idCotizacion INT,
)
BEGIN
    SELECT ID, ID_Servicios,NotaCliente,NotaAdmin,Precio,Estado
    FROM Cotizaciones
    WHERE ID = p_idCotizacion
END $$

DELIMITER ;



DELIMITER $$


-- procedimiento almacenado para Obtener Cotizaciones Por Estado
CREATE PROCEDURE ObtenerCotizacionesPorEstado(IN p_estado INT)
BEGIN
    SELECT 
        ID, 
        ID_Servicios, 
        NotaCliente, 
        NotaAdmin, 
        Precio, 
        Estado
    FROM Cotizaciones
    WHERE Estado = p_estado;
END $$



-- Procedimiento para actualizar el precio, la nota del administrador y el estado
CREATE PROCEDURE actualizarCotizacionDetalle(
    IN p_id INT, 
    IN p_nota_admin VARCHAR(255), 
    IN p_precio DOUBLE, 
    IN p_estado INT
)
BEGIN
    UPDATE CotizacionesDetalle
    SET NotaAdmin = p_nota_admin, 
        Precio = p_precio, 
        Estado = p_estado, 
        Fecha_Modificacion = NOW()
    WHERE ID = p_id;
END $$

-- Procedimiento para obtener todas las cotizaciones por usuario y por un estado
CREATE PROCEDURE obtenerCotizacionesPorUsuarioYEstado(
    IN p_id_cliente INT, 
    IN p_estado INT
)
BEGIN
    SELECT * 
    FROM Cotizaciones
    WHERE ID_Cliente = p_id_cliente AND Estado = p_estado;
END $$

DELIMITER ;

DELIMITER $$


CREATE TRIGGER Trigger_AgregarTrabajo
AFTER UPDATE ON CotizacionesDetalle
FOR EACH ROW
BEGIN
    IF NEW.Estado = 1 AND OLD.Estado != 1 THEN
        INSERT INTO Trabajos (ID_CotizacionDetalle, Estado, Fecha_Creacion, Fecha_Modificacion)
        VALUES (NEW.ID, 1, NOW(), NOW());
    END IF;
END //




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

/*Triggers*/

/*Vistas*/