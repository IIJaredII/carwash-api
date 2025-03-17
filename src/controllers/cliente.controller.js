const connection = require("../config/db");

const insertarCliente = async (req, res) => {
    try {
        const { nombre, correo, telefono, contrasena, foto } = req.body;
        
        if (!nombre || !correo || !telefono || !contrasena) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        const [results] = await connection.execute(
            'CALL insertarCliente(?, ?, ?, ?, ?)',
            [nombre, correo, telefono, contrasena, foto]
        );

        res.status(201).json({ mensaje: "Cliente agregado correctamente", id: results.insertId });
    } catch (error) {
        console.error("Error al insertar cliente:", error);
        res.status(500).json({ mensaje: "Error al insertar cliente" });
    }
};

const actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, telefono, contrasena, foto } = req.body;

        await connection.execute(
            'CALL actualizarCliente(?, ?, ?, ?, ?, ?)',
            [id, nombre, correo, telefono, contrasena, foto]
        );

        res.json({ mensaje: "Cliente actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        res.status(500).json({ mensaje: "Error al actualizar cliente" });
    }
};

const eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;

        await connection.execute('CALL eliminarCliente(?)', [id]);

        res.json({ mensaje: "Cliente eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        res.status(500).json({ mensaje: "Error al eliminar cliente" });
    }
};

const obtenerClientes = async (req, res) => {
    try {
        const [results] = await connection.promise().query('CALL obtenerClientes()');

        console.log(results[0]);

        res.json(results[0]); 
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).json({ mensaje: "Error al obtener clientes" });
    }
};

const obtenerClientePorID = async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await connection.promise().query('CALL obtenerClientePorID(?)', [id]);

        if (!results[0] || results[0].length === 0) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }

        res.json(results[0]); // Retorna solo el primer cliente
    } catch (error) {
        console.error("Error al obtener cliente por ID:", error);
        res.status(500).json({ mensaje: "Error al obtener cliente" });
    }
};

module.exports = {
    insertarCliente,
    actualizarCliente,
    eliminarCliente,
    obtenerClientes,
    obtenerClientePorID
};




//const clientes = [
//    { id: 1, nombre: "Juan Pérez", telefono: "123-4567" },
//    { id: 2, nombre: "Ana Gómez", telefono: "987-6543" }
//];
//exports.obtenerClientes = (req, res) => {
//    res.json(clientes);
//};
