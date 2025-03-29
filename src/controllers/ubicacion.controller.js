const connection = require("../config/db");

const insertarUbicacion = async (req,res) => {
    try{
        const {idCliente,nombre,referencia,ubicacion,latitud,longitud} = req.body;

        if(!idCliente || !nombre || !referencia || !ubicacion || !latitud || !longitud){
            return res.status(400).json({mensaje: "Todos los campos son obligatorios"});
        }

        const [ubicaciones] = await connection.promise().query(
            "SELECT id FROM ubicaciones WHERE nombre = ?",
            [nombre]
        );

        if(ubicaciones.length > 0){
            return res.status(409).json({mensaje: "La ubicación ya está registrada"});
        }

        const results = await connection.promise().query(
            "CALL RegistrarUbicacion(?,?,?,?,?,?)",
            [idCliente,nombre,referencia,ubicacion,latitud,longitud]
        );

        res.status(201).json({
            mensaje: "Ubicación agregada exitosamente",
            id: results.insertId
        });



    }catch(error){

        console.error("Error al insertar ubicación: " + error);
        res.status(500).json({mensaje: "Error al insertar ubicación"});

    }

};

const acualizarUbicacion = async (req,res) => {
    try{

        const {id,idCliente,nombre,referencia,ubicacion,latitud,longitud} = req.body;

        if(!idCliente || !nombre || !referencia || !ubicacion || !latitud || !longitud){
            return res.status(400).json({mensaje: "Todos los campos son obligatorios"});
        }


        const [ubicaciones] = await connection.promise().query("SELECT nombre FROM ubicaciones WHERE id=?",[id]);

        if(ubicaciones.length === 0){
            return res.status(409).json({mensaje: "La ubicacion no ha sido encontrada"});
        }

        await connection.promise().query("CALL ActualizarUbicacion(?,?,?,?,?,?,?)",[id,idCliente,nombre,referencia,ubicacion,latitud,longitud]);
        res.json({mensaje: "ubicacion actualizado exitosamente"});
    }catch(error){
        console.error("Error al actualizar ubicacion: ",error);
        res.status(500).json({mensaje: "Error al actualizar ubicacion"});
    }
}

const eliminarUbicacion = async(req,res) => {
    try{
        const {id} = req.body;

        await connection.promise().query("CALL eliminarUbicacion(?)",[id]);

        res.json({mensaje: "Ubicacion eliminada correctamente"});

    }catch(error){
        console.error("Error al eliminar ubicacion: ",error);
        res.status(500).json({mensaje: "Error al eliminar ubicacion"});
    }
}

const obtenerUbicaciones = async (req,res) => {
    try{
        const [results] = await connection.promise().query('SELECT * FROM ubicaciones WHERE estado=1');
        res.json(results[0]);

    }catch(error){
        console.error("Error al obtener ubicaciones: ",error);
        res.status(500).json({mensaje: "Error al obtener ubicaciones"});

    }
};


const obtenerUbicacionByIDCliente = async (req,res) => {
    try{

        const {id} = req.body;
        const [results] = await connection.promise().query('CALL ObtenerUbicacionesPorCliente(?)',[id]);

        if(!results[0] || results[0].length === 0){
            return res.status(404).json({mensaje: "ubicacion no encontrada"});
        }

        res.json(results[0]);

    }catch(error){
        console.error("Error al obtener la ubicacion por id cliente: ",error);
        return res.status(500).json({mensaje: "Error al obtener la ubicacion por cliente"});
    }
}


module.exports = {
    insertarUbicacion,
    acualizarUbicacion,
    eliminarUbicacion,
    obtenerUbicaciones,
    obtenerUbicacionByIDCliente
}