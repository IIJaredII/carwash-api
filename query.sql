CREATE DATABASE carwahs_el_catracho;

USE carwahs_el_catracho;

CREATE TABLE Rol (
  ID INT AUTO_INCREMENT,
  Nombre VARCHAR(100),
  Descripcion VARCHAR(255),
  PRIMARY KEY (ID)
);

CREATE TABLE Marca (
  ID INT AUTO_INCREMENT,
  Nombre VARCHAR(100),
  PRIMARY KEY (ID)
);

CREATE TABLE Modelo (
  ID INT AUTO_INCREMENT,
  ID_Marca INT,
  Modelo VARCHAR(100),
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
  Estado VARCHAR(50),
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID)
);

CREATE TABLE Referencia_a_la_tarjeta (
  ID INT AUTO_INCREMENT,
  ID_CLIENTE INT,
  Nombre VARCHAR(100),
  ID_Tarjeta INT,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_CLIENTE) REFERENCES Clientes(ID)
);

CREATE TABLE Factura (
  ID INT AUTO_INCREMENT,
  ID_contizacion INT,
  Total DOUBLE,
  Metodo_pago INT,
  ID_Tarjeta INT,
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
  Direccion VARCHAR(255),
  ID_Rol INT,
  Foto_empleado VARCHAR(255),
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Rol) REFERENCES Rol(ID)
);

CREATE TABLE Servicios (
  ID INT AUTO_INCREMENT,
  Servicio VARCHAR(100),
  Precio DOUBLE,
  PRIMARY KEY (ID)
);

CREATE TABLE CotizacionesDetalle (
  ID INT AUTO_INCREMENT,
  ID_Cotizaciones INT,
  ID_Servicios INT,
  Nota VARCHAR(255),
  Precio DOUBLE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Cotizaciones) REFERENCES Cotizaciones(ID),
  FOREIGN KEY (ID_Servicios) REFERENCES Servicios(ID)
);

CREATE TABLE Trabajos (
  ID INT AUTO_INCREMENT,
  ID_CotizacionDetalle INT,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_CotizacionDetalle) REFERENCES CotizacionesDetalle(ID)
);

CREATE TABLE TrabajoEmpleado (
  ID INT AUTO_INCREMENT,
  ID_Empleado INT,
  ID_Trabajo INT,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Empleado) REFERENCES Empleado(ID),
  FOREIGN KEY (ID_Trabajo) REFERENCES Trabajos(ID)
);

CREATE TABLE Evidencias (
  ID INT AUTO_INCREMENT,
  ID_Trabajos INT,
  URL_FOTO VARCHAR(255),
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Trabajos) REFERENCES Trabajos(ID)
);


CREATE TABLE Ubicaciones (
  ID INT AUTO_INCREMENT,
  ID_Cliente INT,
  Nombre VARCHAR(100),
  Referecencia VARCHAR(255),
  Ubicacion VARCHAR(255),
  Fecha_Creacion DATE,
  Fecha_Modificacion DATE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID)
);

CREATE TABLE Carros (
  ID INT AUTO_INCREMENT,
  ID_Cliente INT,
  Placa VARCHAR(20),
  Modelo VARCHAR(100),
  Año YEAR,
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
  FechaActualizacion DATE,
  PRIMARY KEY (ID)
);
