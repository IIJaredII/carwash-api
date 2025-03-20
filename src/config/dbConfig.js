const TABLES = {
    CLIENTES: "Clientes",
    MARCAS: "Marca",
    MODELOS: "Modelo",
    COTIZACIONES: "Cotizaciones",
    SERVICIOS: "Servicios",
    FACTURAS: "Factura",
    EMPLEADOS: "Empleado",
    TRABAJOS: "Trabajos",
    TRABAJO_EMPLEADO: "TrabajoEmpleado",
    TARJETAS: "Tarjetas",
    UBICACIONES: "Ubicaciones",
    EVIDENCIAS: "Evidencias",
    COTIZACIONES_DETALLE: "CotizacionesDetalle",
    CARROS: "Carros",
    ROL: "Rol",
    REFERENCIA_TARJETA: "Referencia_a_la_tarjeta"
};

// Definir columnas para cada tabla
const CLIENTE_COLUMNS = {
    ID: "ID",
    NOMBRE: "Nombre",
    CORREO: "Correo",
    TELEFONO: "Telefono",
    CONTRASEÑA: "Contraseña",
    ESTADO: "Estado",
    FOTO: "URL_FOTO",
    FECHA_CREACION: "Fecha_Creacion",
    FECHA_MODIFICACION: "Fecha_Modificacion"
};

const MARCA_COLUMNS = {
    ID: "ID",
    NOMBRE: "Nombre"
};

const MODELO_COLUMNS = {
    ID: "ID",
    ID_MARCA: "ID_Marca",
    MODELO: "Modelo"
};

const COTIZACIONES_COLUMNS = {
    ID: "ID",
    ID_CLIENTE: "ID_Cliente",
    ID_CARRO: "ID_Carro",
    DESCRIPCION: "Descripcion",
    TOTAL: "Total",
    ESTADO: "Estado"
};

const FACTURA_COLUMNS = {
    ID: "ID",
    ID_COTIZACION: "ID_contizacion",
    TOTAL: "Total",
    METODO_PAGO: "Metodo_pago",
    ID_TARJETA: "ID_Tarjeta",
    FECHA_CREACION: "FechaCreacion",
    FECHA_ACTUALIZACION: "FechaActualizacion"
};

const EMPLEADO_COLUMNS = {
    ID: "ID",
    NOMBRE: "Nombre",
    CORREO: "Correo",
    TELEFONO: "Telefono",
    DIRECCION: "Direccion",
    ID_ROL: "ID_Rol",
    FOTO: "Foto_empleado",
    FECHA_CREACION: "Fecha_Creacion",
    FECHA_MODIFICACION: "Fecha_Modificacion"
};

const SERVICIO_COLUMNS = {
    ID: "ID",
    SERVICIO: "Servicio",
    PRECIO: "Precio"
};

const COTIZACIONES_DETALLE_COLUMNS = {
    ID: "ID",
    ID_COTIZACION: "ID_Cotizaciones",
    ID_SERVICIO: "ID_Servicios",
    NOTA: "Nota",
    PRECIO: "Precio"
};

const TRABAJOS_COLUMNS = {
    ID: "ID",
    ID_COTIZACION_DETALLE: "ID_CotizacionDetalle"
};

const TRABAJO_EMPLEADO_COLUMNS = {
    ID: "ID",
    ID_EMPLEADO: "ID_Empleado",
    ID_TRABAJO: "ID_Trabajo"
};

const EVIDENCIAS_COLUMNS = {
    ID: "ID",
    ID_TRABAJO: "ID_Trabajos",
    URL_FOTO: "URL_FOTO"
};

const UBICACIONES_COLUMNS = {
    ID: "ID",
    ID_CLIENTE: "ID_Cliente",
    NOMBRE: "Nombre",
    REFERENCIA: "Referecencia",
    UBICACION: "Ubicacion",
    FECHA_CREACION: "Fecha_Creacion",
    FECHA_MODIFICACION: "Fecha_Modificacion"
};

const CARROS_COLUMNS = {
    ID: "ID",
    ID_CLIENTE: "ID_Cliente",
    PLACA: "Placa",
    MODELO: "Modelo",
    AÑO: "Año"
};

const TARJETAS_COLUMNS = {
    ID: "ID",
    NUMERO_TARJETA: "Numero_de_tarjeta",
    FECHA_VENCIMIENTO: "Fecha_vencimiento",
    CODIGO: "Codigo",
    NOMBRE_TITULAR: "NombreTitular",
    FECHA_ACTUALIZACION: "FechaActualizacion"
};

const ROL_COLUMNS = {
    ID: "ID",
    NOMBRE: "Nombre",
    DESCRIPCION: "Descripcion"
};

const REFERENCIA_TARJETA_COLUMNS = {
    ID: "ID",
    ID_CLIENTE: "ID_CLIENTE",
    NOMBRE: "Nombre",
    ID_TARJETA: "ID_Tarjeta"
};

module.exports = {
    TABLES,
    CLIENTE_COLUMNS,
    MARCA_COLUMNS,
    MODELO_COLUMNS,
    COTIZACIONES_COLUMNS,
    FACTURA_COLUMNS,
    EMPLEADO_COLUMNS,
    SERVICIO_COLUMNS,
    COTIZACIONES_DETALLE_COLUMNS,
    TRABAJOS_COLUMNS,
    TRABAJO_EMPLEADO_COLUMNS,
    EVIDENCIAS_COLUMNS,
    UBICACIONES_COLUMNS,
    CARROS_COLUMNS,
    TARJETAS_COLUMNS,
    ROL_COLUMNS,
    REFERENCIA_TARJETA_COLUMNS,
};
