const connection = require("../config/db");

const insertarCotizacion = async (req, res) => {
    try {
        const idCliente = req.user.id;
        const {modalidad, idCarro, descripcion, fechaCita, detalles } = req.body;
        //detalles lleva esto: idServicio, notaCliente, precio
        const [result] = await connection.promise().query(
            "CALL insertarCotizacion(?,?,?,?,?,?)",
            [idCliente,modalidad, idCarro, descripcion, fechaCita, JSON.stringify(detalles)]
        );

        res.status(201).json({
            mensaje: "Cotizazcion agregada correctamente",
            id: result.insertId
        });
    } catch (error) {
        console.error("Error al insertar cotizacion:", error);

        res.status(500).json({
            mensaje: "Error al insertar la Cotizazcion"
        });
    }
}

const obtenerCotizacionesPorEstado = async (req, res) => {
    const { estado } = req.params; 

    try {
        const [result] = await connection.promise().query(`CALL obtenerCotizacionesPorEstado()`, [estado]);
        
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener cotizaciones' });
    }
};


const obtenerCotizacionConDetalles = async (req, res) => {
    const {id} = req.params;

    try {
        const [cotizacionResult] = await connection.promise().query(
            "CALL obtenerCotizacionPorId(?)", 
            [id]
        );

        const [detallesResult] = await connection.promise().query(
            "CALL obtenerDetallesDeCotizacion(?)", 
            [id]
        );

        const cotizacion = cotizacionResult[0][0]; 
        console.log(cotizacion);

        if (!cotizacion) {
            return res.status(404).json({ error: "Cotización no encontrada" });
        }

        const detalles = detallesResult[0];
        console.log(detalles);

        const cotizacionFormateada = {
            idCliente: cotizacion.ID_Cliente,
            idCarro: cotizacion.ID_Carro,
            descripcion: cotizacion.Descripcion,
            fechaCita: cotizacion.Fecha_Cita,
            estado: cotizacion.Estado,
            detalles: detalles.map(detalle => ({
                idServicio: detalle.ID_Servicios,
                notaCliente: detalle.NotaCliente,
                notaAdmin: detalle.NotaAdmin,
                precio: detalle.Precio
            }))
        };

        res.status(200).json(cotizacionFormateada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la cotización o los detalles' });
    }
};

const actualzizarDetallesCotizacion = async (req, res) => {
    try {
        const {detalles} = req.body; //id del detalleCotizacion, nota del admin y el precio

        const [result] = await connection.promise().query("", {detalles});
    } catch (error) {

    }
}

const obtenerCotizacionDetallePendiente = async (req, res) => {
    try {
        const idCliente = req.user.id;
        const { idCotizacion } = req.params;

        const [result] = await connection.promise().query(
            "CALL obtenerCotizacionDetallePendiente(?, ?)",
            [idCotizacion, idCliente]
        );

        const data = result[0];

        if (!data.length) {
            return res.status(404).json({ mensaje: "No se encontró la cotización." });
        }
        const {
            ID,
            Modalidad,
            Latitud,
            Longitud,
            Placa,
            Año,
            Color,
            Marca,
            Modelo
        } = data[0];

        const servicios = data.map(row => ({
            servicio: row.Servicio,
            precio: row.Precio,
            notaCliente: row.NotaCliente,
            notaAdmin: row.NotaAdmin
        }));

        const cotizacion = {
            id: ID,
            modalidad: Modalidad,
            latitud: Latitud,
            longitud: Longitud,
            placa: Placa,
            año: Año,
            color: Color,
            marca: Marca,
            modelo: Modelo,
            servicios
        };

        res.json(cotizacion);

    } catch (error) {
        console.error("Error al obtener cotización:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
};





module.exports = {
    insertarCotizacion,
    obtenerCotizacionConDetalles,
    obtenerCotizacionesPorEstado,
    obtenerCotizacionDetallePendiente,
}