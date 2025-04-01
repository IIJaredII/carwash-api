const fs = require("fs");
const connection = require("../config/db");
const email = require("../config/email");

const verificarCorreo = async (req, res) => {
    const {correo} = req.body;
    try {

        if (!correo) {
            return res.status(400).json({ mensaje: "Correo no recibido" });
        }
        const [cliente] = await connection.promise().query(
            "SELECT id FROM clientes WHERE correo = ?",
            [correo]
        );

        if (cliente.length > 0) {
            return res.status(409).json({ mensaje: "El cliente ya está registrado" });
        }

        const codigoVerificacion = Math.floor(100000 + Math.random() * 900000);
        const mensajeTexto = `Hola,

        Hemos recibido una solicitud para crear una cuenta en Carwash El Catracho con este correo.

        Tu código de verificación es: ${codigoVerificacion}

        Si no realizaste esta solicitud, puedes ignorar este mensaje.`;

        email.enviarCorreo(
            correo,
            "Código de verificación para tu cuenta en Carwash El Catracho",
            mensajeTexto,
            null
        )
        return res.status(200).json({ codigo: codigoVerificacion });

    } catch (error) {
        
    }

}

const insertarCliente = async (req, res) => {
    try {
        const { nombre, correo, telefono, contrasena } = req.body;
        const foto = req.file ? req.file.path.replace(/\\/g, "/") : null;

        if (!nombre || !correo || !telefono || !contrasena) {
            if (foto) fs.unlinkSync(foto);
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios, excepto la foto" });
        }

        const [cliente] = await connection.promise().query(
            "SELECT id FROM clientes WHERE correo = ?",
            [correo]
        );

        if (cliente.length > 0) {
            if (foto) fs.unlinkSync(foto);
            return res.status(409).json({ mensaje: "El cliente ya está registrado" });
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

        res.json(results[0]);
    } catch (error) {
        console.error("Error al obtener cliente por ID:", error);
        res.status(500).json({ mensaje: "Error al obtener cliente" });
    }
};

module.exports = {
    verificarCorreo,
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
