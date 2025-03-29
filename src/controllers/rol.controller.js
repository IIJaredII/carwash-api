const connection = require("../config/db");

const insertarRol = async (req,res) => {
    try{
        const {nombre,descripcion} = req.body;

        if(!nombre || !descripcion){
            return res.status(400).json({mensaje: "Todos los campos son obligatorios"});
        }

        const [rol] = await connection.promise().query(
            "SELECT id FROM rol WHERE nombre = ? and estado=1",
            [nombre]
        );

        if(rol.length > 0){
            return res.status(409).json({mensaje: "El rol ya está registrado"});
        }

        const results = await connection.promise().query(
            "CALL insertarRol(?, ?)",
            [nombre,descripcion]
        );

        res.status(201).json({
            mensaje: "Rol agregado exitosamente",
            id: results.insertId
        });



    }catch(error){

        console.error("Error al insertar rol: " + error);
        res.status(500).json({mensaje: "Error al insertar rol"});

    }

};

const obtenerRoles = async (req,res) => {
    try{
        const [results] = await connection.promise().query('CALL obtenerRol()');
        res.json(results[0]);

    }catch(error){
        console.error("Error al obtener roles: ",error);
        res.status(500).json({mensaje: "Error al obtener roles"});

    }
};

const obtenerRolByID = async (req,res) => {
    try{

        const {id} = req.params;
        const [results] = await connection.promise().query('CALL obtenerRolPorID(?)',[id]);

        if(!results[0] || results[0].length === 0){
            return res.status(404).json({mensaje: "Rol no encontrado"});
        }

        res.json(results[0]);

    }catch(error){
        console.error("Error al obtener el rol por id: ",error);
        return res.status(500).json({mensaje: "Error al obtener el Rol"});
    }
}


const acualizarRol = async (req,res) => {
    try{
        const {id} = req.params;
        const {nombre,descripcion} = req.body;

        if(!nombre || !descripcion){
            return res.status(400).json({mensaje: "Todos los campos son obligatorios"});
        }

        const [rol] = await connection.promise().query("SELECT nombre FROM rol WHERE id=?",[id]);

        if(rol.length === 0){
            return res.status(409).json({mensaje: "El rol no ha sido encontrado"});
        }

        await connection.promise().query("CALL actualizarRol(?,?,?)",[id,nombre,descripcion]);
        res.json({mensaje: "Rol actualizado exitosamente"});
    }catch(error){
        console.error("Error al actualizar rol: ",error);
        res.status(500).json({mensaje: "Error al actualizar rol"});
    }
}

const eliminarRol = async(req,res) => {
    try{
        const {id} = req.params;

        await connection.promise().query("CALL eliminarRol(?)",[id]);

        res.json({mensaje: "Rol eliminado correctamente"});

    }catch(error){
        console.error("Error al eliminar rol: ",error);
        res.status(500).json({mensaje: "Error al eliminar rol"});
    }
}

module.exports = {
    insertarRol,
    obtenerRoles,
    obtenerRolByID,
    acualizarRol,
    eliminarRol
};

