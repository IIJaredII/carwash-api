const fs = require("fs");
const connection = require("../config/db");


const insertarEmpleado = async (req, res) => {
    try{
        const { nombre, correo, telefono, contrasena, direccion, rol } = req.body;
        const foto = req.file ? req.file.path.replace(/\\/g,"/") : null;

        if(!nombre || !correo || !telefono || !contrasena || !direccion || !rol){
            
            if(foto) fs.unlinkSync(foto);
            
            return res.status(400).json({mensaje: "Todos los campos son obligatorios, menos la foto"});
        };

        const [empleado] = await connection.promise().query("SELECT id FROM empleado WHERE correo = ?",[correo]);

        if(empleado.length > 0){
            if(foto) fs.unlinkSync(foto);
            return res.status(409).json({mensaje: "El empleado ya está registrado"});
        }

        const [results] = await connection.promise().query(
            "CALL insertarEmpleado(?,?,?,?,?,?,?)",
            [nombre,correo,telefono,contrasena,direccion,rol,foto]
        );

        res.status(201).json({
            mensaje: "Empleado agregado correctamente",
            id: results.insertId,
            foto

        });

    }catch(error){
        console.error("Error al insertar empleado: ",error);
        res.status(500).json({mensaje: "Error al insertar empleado"});
    }
}

const obtenerEmpleados = async(req,res) => {
    try{
        const [results] = await connection.promise().query('CALL obtenerEmpleado()');

        res.json(results[0]);

    }catch(error){
        console.error("Error al obtener los empleados: ",error);
        res.status(500).json({mensaje: "Error al obtener los empleados"});
    }
}

const actualizarEmpleado = async (req,res) =>{
    try{
        const {id} = req.params;
        const {nombre,correo,telefono,contrasena,direccion,rol} = req.body;
        const nuevaFoto = req.file ? req.file.path : null;

        const [empleado] = await connection.promise().query("SELECT Foto_empleado FROM empleado WHERE id = ?", [id]);

        if(empleado.length === 0){
            return res.status(404).json({mensaje: "empleado no encontrado"});
        }

        const imagenActual = empleado[0].Foto_empleado;


        if(nuevaFoto && imagenActual){
            if(fs.existsSync(imagenActual)){
                fs.unlinkSync(imagenActual);
            }
        }

        await connection.promise().query(
            "CALL actualizarEmpleado(?,?,?,?,?,?,?,?)",
            [id,nombre,correo,telefono,contrasena,direccion,rol,nuevaFoto]
        );

        res.json({mensaje: "Empleado actualizado exitosamente"});
    }catch(error){
        console.error("Error al actualizar Empleado: ",error);
        res.status(500).json({mensaje: "Error al actualizar empleado"});
    }
}

const eliminarEmpleado = async(req,res) => {
    try{
        const {id} = req.params;
        await connection.promise().query("CALL eliminarEmpleado(?)",[id]);
        res.json({mensaje: "Empleado eliminado correctamente"});

    }catch(error){
        console.error("Error al eliminar empleado: ",error);
        res.status(500).json({mensaje: "Error al eliminar empleado"});
    }
};

const obtenerEmpleadoById = async (req,res) => {
    try{

        const { id } = req.params;
        const [results] = await connection.promise().query('CALL obtenerEmpleadoPorID(?)', [id]);

        if (!results[0] || results[0].length === 0) {
            return res.status(404).json({ mensaje: "Empleado no encontrado" });
        }

        res.json(results[0]);

    }catch(error){
        console.error("Error al obtener empleado: ",error);
        res.status(500).json({mensaje: "Error al obtener empleado"});
    }
};

module.exports = {
    insertarEmpleado,
    obtenerEmpleados,
    actualizarEmpleado,
    eliminarEmpleado,
    obtenerEmpleadoById
};