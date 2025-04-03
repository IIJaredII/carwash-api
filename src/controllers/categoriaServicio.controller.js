const connection = require("../config/db");

const insertarCategoriaServicio = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre || !descripcion) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        const [categoria] = await connection.promise().query(
            "SELECT ID FROM CategoriaServicios WHERE Nombre = ? AND Estado = 1",
            [nombre]
        );

        if (categoria.length > 0) {
            return res.status(409).json({ mensaje: "La categoría ya está registrada" });
        }

        const results = await connection.promise().query(
            "CALL insertarCategoria(?, ?)",
            [nombre, descripcion]
        );

        res.status(201).json({
            mensaje: "Categoría de servicio agregada exitosamente",
            id: results.insertId
        });
    } catch (error) {
        console.error("Error al insertar categoría de servicio: " + error);
        res.status(500).json({ mensaje: "Error al insertar categoría de servicio" });
    }
};

const obtenerCategoriasServicios = async (req, res) => {
    try {
        const [results] = await connection.promise().query('CALL obtenerCategorias()');
        res.json(results[0]);
    } catch (error) {
        console.error("Error al obtener categorías de servicios: ", error);
        res.status(500).json({ mensaje: "Error al obtener categorías de servicios" });
    }
};

const obtenerCategoriaServicioByID = async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await connection.promise().query('CALL obtenerCategoriaPorID(?)', [id]);

        if (!results[0] || results[0].length === 0) {
            return res.status(404).json({ mensaje: "Categoría no encontrada" });
        }

        res.json(results[0]);
    } catch (error) {
        console.error("Error al obtener la categoría de servicio por ID: ", error);
        return res.status(500).json({ mensaje: "Error al obtener la categoría de servicio" });
    }
};

const actualizarCategoriaServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        if (!nombre || !descripcion) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        const [categoria] = await connection.promise().query("SELECT Nombre FROM CategoriaServicios WHERE ID = ?", [id]);

        if (categoria.length === 0) {
            return res.status(404).json({ mensaje: "La categoría no ha sido encontrada" });
        }

        await connection.promise().query("CALL actualizarCategoria(?, ?, ?)", [id, nombre, descripcion]);
        res.json({ mensaje: "Categoría de servicio actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar categoría de servicio: ", error);
        res.status(500).json({ mensaje: "Error al actualizar categoría de servicio" });
    }
};

const eliminarCategoriaServicio = async (req, res) => {
    try {
        const { id } = req.params;

        await connection.promise().query("CALL eliminarCategoria(?)", [id]);
        res.json({ mensaje: "Categoría de servicio eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar categoría de servicio: ", error);
        res.status(500).json({ mensaje: "Error al eliminar categoría de servicio" });
    }
};

module.exports = {
    insertarCategoriaServicio,
    obtenerCategoriasServicios,
    obtenerCategoriaServicioByID,
    actualizarCategoriaServicio,
    eliminarCategoriaServicio
};
