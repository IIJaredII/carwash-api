const connection = require('../config/db');

const insertarCarro = async (req,res) => {
    try{
        const idCliente = req.user.id;
        const { placa, modelo, year,color} = req.body;
        
        if(!idCliente || !placa || !modelo || !year || !color){
            return res.status(400).json({mensaje: "Todos los campos son obligatorios"})
        }

        const [carros] = await connection.promise().query("SELECT id FROM carros where placa=?",[placa]);

        if(carros.length>0){
            return res.status(409).json({mensaje: "El carro ya está registrado"});
        }

        const results = await connection.promise().query("CALL RegistrarCarro(?,?,?,?,?)",[idCliente,placa,modelo,year,color]);

        res.status(201).json({mensaje: "Carro insertado exitosamente",
            id: results.insertId
        });

    }catch(error){
        console.error("Error al insertar carro: ",error);
        res.status(500).json({mensaje: "Error al insertar carro"});
    }
}

const obtenerCarroPorIdCliente = async (req,res) => {
    try{
        const idCliente = req.user.id;
    
        const [results] = await connection.promise().query("CALL ObtenerCarrosPorCliente(?)",[idCliente]);

        if(!results[0] || results[0].length === 0){
            return res.status(404).json({mensaje: "Carro no encontrado"});
        }

        res.status(200).json(results[0]);

    }catch(error){
        console.error("Error al obtener carro por id cliente: ",error);
        return res.status(500).json({mensaje: "Error al obtener carro por id cliente"});
    }
}

const obtenerCarroPorId = async (req,res) => {
    try{
        const {id} = req.body;
    
        const [results] = await connection.promise().query("CALL ObtenerCarroPorID(?)",[id]);

        if(!results[0] || results[0].length === 0){
            return res.status(404).json({mensaje: "Carro no encontrado"});
        }

        res.json(results[0]);

    }catch(error){
        console.error("Error al obtener carro por id: ",error);
        return res.status(500).json({mensaje: "Error al obtener carro por id"});
    }
}

const obtenerCarros = async (req,res) => {
    try{
        const [results] = await connection.promise().query('SELECT * FROM carros WHERE estado=1');
        res.json(results[0]);

    }catch(error){
        console.error("Error al obtener carros: ",error);
        res.status(500).json({mensaje: "Error al obtener carros"});

    }
};

const actualizarCarro = async (req,res) => {
    try{
        const {id, idCliente, placa, modelo, year} = req.body;
        
        if(!id || !idCliente || !placa || !modelo || !year){
            return res.status(400).json({mensaje: "Todos los campos son obligatorios"})
        }

        const [carro] = await connection.promise().query("SELECT placa FROM carros WHERE id=?",[id]);

        if(carro.length === 0){
            return res.status(409).json({mensaje: "El carro no ha sido encontrado"});
        }

        await connection.promise().query("CALL ActualizarCarro(?,?,?,?,?)", [id, idCliente, placa, modelo, year]);
        res.json({mensaje: "Carro actualizado exitosamente"});

    }catch(error){
        console.error("Error al actualizar carro: ",error);
        return res.status(500).json({mensaje: "Error al actualizar carro"});
    }
}

const eliminarCarro = async(req,res) => {
    try{
        const {id} = req.body;

        await connection.promise().query("CALL eliminarCarro(?)",[id]);

        res.json({mensaje: "Carro eliminado correctamente"});

    }catch(error){
        console.error("Error al eliminar Carro: ",error);
        res.status(500).json({mensaje: "Error al eliminar Carro"});
    }
}

const obtenerModeloPorIdMarca = async (req,res) => {
    try{
        const {id} = req.body;
    
        const [results] = await connection.promise().query("CALL ObtenerModelosPorMarca(?)",[id]);

        if(!results[0] || results[0].length === 0){
            return res.status(404).json({mensaje: "Modelo no encontrado"});
        }

        res.json(results[0]);

    }catch(error){
        console.error("Error al obtener modelo por id Marca: ",error);
        return res.status(500).json({mensaje: "Error al obtener modelo por id Marca"});
    }
}

const obtenerMarcas = async (req,res) => {
    try{
    
        const [results] = await connection.promise().query("SELECT * FROM Marca");

        if(!results[0] || results[0].length === 0){
            return res.status(404).json({mensaje: "Modelo no encontrado"});
        }

        res.json(results);

    }catch(error){
        console.error("Error al obtener modelo por id Marca: ",error);
        return res.status(500).json({mensaje: "Error al obtener modelo por id Marca"});
    }
}

const obtenerMarcasConModelos = async (req, res) => {
    try {
        const [rows] = await connection.promise().query("CALL obtenerMarcasConModelos()");

        const data = rows[0];

        const marcas = {};

        data.forEach(row => {
            const { id_marca, nombre_marca, id_modelo, nombre_modelo } = row;

            if (!marcas[id_marca]) {
                marcas[id_marca] = {
                    id: id_marca,
                    nombre: nombre_marca,
                    modelos: []
                };
            }

            marcas[id_marca].modelos.push({
                id: id_modelo,
                nombre: nombre_modelo
            });
        });

        const resultadoFinal = Object.values(marcas);

        return res.status(200).json(resultadoFinal);

    } catch (error) {
        console.error("Error al obtener marcas con modelos:", error);
        return res.status(500).json({ mensaje: "Error al obtener marcas con modelos" });
    }
};


module.exports = {
    insertarCarro,
    obtenerCarroPorIdCliente,
    obtenerCarroPorId,
    obtenerCarros,
    actualizarCarro,
    eliminarCarro,
    obtenerModeloPorIdMarca,
    obtenerMarcas,
    obtenerMarcasConModelos
}