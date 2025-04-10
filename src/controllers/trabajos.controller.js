const connection = require("../config/db");

const obtenerTabajoPorEmpleado = async (req, res) => {
    try {
        const { idEmpleado } = req.params;
        const [result] = await connection.promise().query(
            "CALL obtenerTabajoDeEmpleado(?)",
            [idEmpleado]
        );

        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los trabajos' });
    }
}

const obtenerTabajosPorCotizaciones = async (req, res) => {
    try {
        const { idEmpleado,idCotizacion } = req.params;
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

module.exports = {
    obtenerTabajosPorCotizaciones,
    obtenerTabajoPorEmpleado
}