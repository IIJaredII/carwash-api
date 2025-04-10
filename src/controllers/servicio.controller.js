const connection = require("../config/db");

const insertarServicio = async (req, res) => {
    try {
        const { servicio, precio, idCategoria } = req.body;

        if (!servicio || !precio || !idCategoria) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        const results = await connection.promise().query(
            "CALL insertarServicio(?, ?, ?)",
            [servicio, precio, idCategoria]
        );

        res.status(201).json({
            mensaje: "Servicio agregado exitosamente",
            id: results.insertId
        });
    } catch (error) {
        console.error("Error al insertar servicio: " + error);
        res.status(500).json({ mensaje: "Error al insertar servicio" });
    }
};

const obtenerServicios = async (req, res) => {
    try {
        const [results] = await connection.promise().query('CALL obtenerServicios()');
        res.json(results[0]);
    } catch (error) {
        console.error("Error al obtener los servicios: ", error);
        res.status(500).json({ mensaje: "Error al obtener los servicios" });
    }
};

const obtenerServicioByID = async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await connection.promise().query('CALL obtenerServicioPorID(?)', [id]);

        if (!results[0] || results[0].length === 0) {
            return res.status(404).json({ mensaje: "Servicio no encontrado" });
        }

        res.status(200).json(results[0]);
    } catch (error) {
        console.error("Error al obtener el servicio por ID: ", error);
        return res.status(500).json({ mensaje: "Error al obtener el servicio" });
    }
};

const actualizarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const { servicio, precio, idCategoria } = req.body;

        if (!servicio || !precio || !idCategoria) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        const [servicioExistente] = await connection.promise().query("SELECT Servicio FROM Servicios WHERE ID = ?", [id]);

        if (servicioExistente.length === 0) {
            return res.status(404).json({ mensaje: "El servicio no ha sido encontrado" });
        }

        await connection.promise().query("CALL actualizarServicio(?, ?, ?, ?)", [id, servicio, precio, idCategoria]);
        res.json({ mensaje: "Servicio actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar servicio: ", error);
        res.status(500).json({ mensaje: "Error al actualizar servicio" });
    }
};

const eliminarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        await connection.promise().query("CALL eliminarServicio(?)", [id]);
        res.json({ mensaje: "Servicio eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar servicio: ", error);
        res.status(500).json({ mensaje: "Error al eliminar servicio" });
    }
};

module.exports = {
    insertarServicio,
    obtenerServicios,
    obtenerServicioByID,
    actualizarServicio,
    eliminarServicio
};
