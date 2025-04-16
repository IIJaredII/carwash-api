const connection = require("../config/db");
const auth = require("../middlewares/authConfig");
const { getIO } = require("../config/socket");
const firebase = require("../config/firebase");


const obtenerTabajoPorEmpleado = async (req, res) => {
    try {
        const idEmpleado = req.user.id;

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
        const idEmpleado = req.user.id;
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
            "CALL actualizarCotizacionDetalle(?)",[detalles]
        );
        res.status(200)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los trabajos' });
    }
}

const emplezarTrabajo = async (req, res) => {
    try{
        const io = getIO();
        const token2 = "fkyiKuw6T-uOdTFg_dmbC6:APA91bGrX97H7xbpi1FOF5w2CG594uwRetX7AyvjZbNw4wnxhGqd5PT6ud-drGz5pDD8oY5rPtYsSxJyVzrh4nOOSP1ox-71o8MFd3jP0yGkZS0QD7a5iJE";
        const { id } = req.params;

        console.log("ID del trabajo ", id);

        await connection.promise().query(
            "CALL empezarTrabajo(?)", [id]
        );

        io.emit("Trabajos", { mensaje: "Se inició un trabajo", idTrabajo: id });


        firebase.enviarNotificacion(token2,"a","Se inicio un trabajo xD");

        res.status(200).json({ mensaje: "Trabajo iniciado correctamente" });
    }catch(error) {
        res.status(500).json({error: "Error al empezar el trabajo"});
        console.error(error);
    }
}

const obtenerDatosGeneralesTrabajo = async (req, res) => {
    try {
        const idEmpleado = req.user.id;
        const { id } = req.params;

        const [result] = await connection.promise().query(
            "CALL obtenerDatosGeneralesTrabajo(?,?)",
            [idEmpleado, id]
        );

        res.status(200).json(result[0][0]); 


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los trabajos' });
    }
}

const obtenerServiciosDeTrabajo = async (req, res) => {
    try {
        const idEmpleado = req.user.id;
        const { id } = req.params;

        const [result] = await connection.promise().query(
            "CALL obtenerServiciosDeTrabajo(?,?)",
            [idEmpleado, id]
        );

        res.status(200).json(result[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los trabajos' });
    }
}

const marcarTrabajoCompletado = async (req, res) => {
    try{
        const io = getIO();
        const idEmpleado = req.user.id;
        const { id,idCotizacion } = req.params;

        console.log("ID del trabajo ", id);

        await connection.promise().query(
            "CALL marcarTrabajoCompletado(?,?)", [idEmpleado,id]
        );

        io.emit(`Trabajo-${idCotizacion}`, { mensaje: "Actualización del trabajo", idTrabajo: id });
        console.log(`emitiendo Trabajo-${idCotizacion}`, )

        res.status(200).json({ mensaje: "Trabajo iniciado correctamente" });
    }catch(error) {
        res.status(500).json({error: "Error al empezar el trabajo"});
        console.error(error);
    }
}

const subirEvidencia = async (req, res) => {
    try {
        const { idTrabajo, nota, idCotizacion } = req.body;
        const archivo = req.file;

        console.log(req.body);

        if (!archivo) {
            return res.status(400).json({ mensaje: "No se recibió ningún archivo." });
        }

        const nombreArchivo = archivo.filename;

        await connection.promise().query(
            "CALL guardarEvidencia(?,?,?)", 
            [idTrabajo, nombreArchivo, nota]
         );

        const io = getIO();
        io.emit("Trabajo-" + idCotizacion, { tipo: "evidenciaSubida" });

        res.status(200).json({ mensaje: "Evidencia subida correctamente." });
    } catch (error) {
        console.error("Error al subir evidencia:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
};

const terminarTrabajo = async (req, res) => {
    try {
        const io = getIO();
        const { id } = req.params;

        console.log("ID del trabajo ", id);

        const [resultSets] = await connection.promise().query(
            "CALL terminarTrabajo(?)", [id]
        );

        const dispositivos = resultSets[0];
        console.log("Dispositivos: ",dispositivos);

        io.emit("Trabajos", { mensaje: "Se inició un trabajo", idTrabajo: id });

        for (const dispositivo of dispositivos) {
            const token = dispositivo.Token;
            if (token) {
                await firebase.enviarNotificacion(token, 
                    "Trabajo Finalizado", 
                    "Su vehiculo ya esta listo para recoger");
                console.log("token: "+token);
            }
        }

        res.status(200).json({ mensaje: "Trabajo iniciado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al empezar el trabajo" });
        console.error(error);
    }
}

module.exports = {
    obtenerTabajosPorCotizaciones,
    obtenerTabajoPorEmpleado,
    revisarDetallesCotizacion,
    emplezarTrabajo,
    obtenerDatosGeneralesTrabajo,
    obtenerServiciosDeTrabajo,
    marcarTrabajoCompletado,
    subirEvidencia,
    terminarTrabajo
}