const connection = require("../config/db");

const insertarCotizacion = async (req, res) => {
    try {
        const { idCliente, idCarro, descripcion, fechaCita, detalles } = req.body;
        //detalles lleva esto: idServicio, notaCliente, precio
        const [result] = await connection.promise().query(
            "CALL insertarCotizacion(?,?,?,?,?)",
            [idCliente, idCarro, descripcion, fechaCita, JSON.stringify(detalles)]
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

const obtenerCotizaciones = async (req, res) => {
    const { estado } = req.params; 

    let procedimiento = '';
    
    switch(parseInt(estado)) {
        case 3:
            procedimiento = 'obtenerCotizacionesPendientes'; 
            break;
        case 1:
            procedimiento = 'obtenerCotizacionesAceptadas';
            break;
        case 5:
            procedimiento = 'obtenerCotizacionesFaltantes';
            break;
        default:
            return res.status(400).json({ error: 'Estado inválido' }); 
    }

    try {
        const [result] = await connection.promise().query(`CALL ${procedimiento}()`);
        
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



module.exports = {
    insertarCotizacion,
    obtenerCotizacionConDetalles,
    obtenerCotizaciones,
}