const fs = require("fs");
const connection = require("../config/db");

const insertarCliente = async (req, res) => {
    try {
        const { nombre, correo, telefono, contrasena } = req.body;
        const foto = req.file ? req.file.path.replace(/\\/g, "/") : null; // Normalizamos la ruta

        if (!nombre || !correo || !telefono || !contrasena) {
            if (foto) fs.unlinkSync(foto);//Elimina la forto
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios, excepto la foto" });
        }

        const [cliente] = await connection.promise().query(
            "SELECT id FROM clientes WHERE correo = ?",
            [correo]
        );

        if (cliente.length > 0) {
            if (foto) fs.unlinkSync(foto);
            return res.status(409).json({ mensaje: "El cliente ya está registrado" }); // 409: Conflicto
        }
       
        const [results] = await connection.promise().query(
            "CALL insertarCliente(?, ?, ?, ?, ?)",
            [nombre, correo, telefono, contrasena, foto]
        );

        res.status(201).json({
            mensaje: "Cliente agregado correctamente",
            id: results.insertId,
            foto,
        });

    } catch (error) {
        console.error("Error al insertar cliente:", error);

        if (req.file) {
            try {
                fs.unlinkSync(req.file.path);
                console.log("Imagen eliminada debido a un error en la BD.");
            } catch (unlinkError) {
                console.error("Error al eliminar la imagen:", unlinkError);
            }
        }

        res.status(500).json({ mensaje: "Error al insertar cliente" });
    }
};


const actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, telefono, contrasena } = req.body;
        const nuevaFoto = req.file ? req.file.path : null; // Ruta de la nueva imagen

        // Obtener la ruta de la imagen actual en la base de datos
        const [cliente] = await connection.promise().query("SELECT URL_FOTO FROM clientes WHERE id = ?", [id]);

        if (cliente.length === 0) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }

        const imagenActual = cliente[0].URL_FOTO;

        console.log("URL de la imagen: "+imagenActual);

        // Si hay una imagen nueva y había una anterior, eliminar la anterior
        if (nuevaFoto && imagenActual) {
            if (fs.existsSync(imagenActual)) {
                fs.unlinkSync(imagenActual); // Elimina la imagen anterior
            }
        }

        // Actualizar datos del cliente en la BD con la nueva imagen
        await connection.promise().query(
            "CALL actualizarCliente(?, ?, ?, ?, ?, ?)",
            [id, nombre, correo, telefono, contrasena, nuevaFoto]
        );

        res.json({ mensaje: "Cliente actualizado correctamente", foto: nuevaFoto });
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        res.status(500).json({ mensaje: "Error al actualizar cliente" });
    }
};

const eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;

        await connection.promise().query('CALL eliminarCliente(?)', [id]);

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
