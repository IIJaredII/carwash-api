const connection = require("../config/db");
const auth = require("../middlewares/authConfig");

const obtenerTabajoPorEmpleado = async (req, res) => {
    try {
        const token = req.headers["authorization"];
        const idEmpleado = auth.getUserIdFromToken(token);

        const [result] = await connection.promise().query(
            "CALL obtenerTrabajoDeEmpleado(?)",
            [idEmpleado]
        );

        res.status(200).json(result[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los trabajos' });
    }
}

const obtenerTabajosPorCotizaciones = async (req, res) => {
    try {
        const token = req.headers["authorization"];
        const idEmpleado = auth.getUserIdFromToken(token);
        
        const { idCotizacion } = req.params;
        const [result] = await connection.promise().query(
            "CALL obtenerTabajosAsignados(?,?)",
            [idEmpleado, idCotizacion]
        );

        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los trabajos' });
    }
}

const revisarDetallesCotizacion = async (req, res) => {
   try{
        const {detalles} = req.body;
        const [result] = await connection.promise().query(
            "CALL actualizarCotizacionDetalle(?)",{detalles}
        );
        res.status(200)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los trabajos' });
    }
}

const emplezarTrabajo = async (req, res) => {
    try{
        const {idTrabajo,} = req.params;
        const [result] = await connection.promise().query(
            "CALL empezarTrabajo(?)",{idTrabajo}
        );
        res.status(200);
    }catch(error) {
        res.status(500).json({error: "Error al empezar el trabajo"});
    }
}

module.exports = {
    obtenerTabajosPorCotizaciones,
    obtenerTabajoPorEmpleado,
    revisarDetallesCotizacion
}