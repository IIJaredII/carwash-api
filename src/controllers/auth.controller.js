const connection = require("../config/db");
const {verifyToken,checkRole,generateToken,verificarAcceso} = require("../middlewares/authConfig");

const loginCliente = async (req, res) => {
    try {
        const{correo,contrasena}= req.body;

        const [results] = await connection.promise().query(
            "CALL loginClientes(?)",
            [correo]
        );

        if (!results[0] || results[0].length === 0) {
            return res.status(404).json({ mensaje: "Correo o contraseña incorrecto" });
        }

        const user = results[0][0];
        if(user.Contraseña === contrasena) {
            const token = generateToken(user,"C");
            res.json({ token, id:user.ID,username: user.Nombre });
        }else{
            res.status(404).json({ mensaje: "Contraseña incorrecta" });
        }

    } catch (error) {
        console.error("Error al autentificar cliente:", error);
        res.status(500).json({ mensaje: "Error al autentificar cliente" });
    }
}

const loginEmpleado = async (req, res) => {
    try {
        const{correo,contrasena}= req.body;

        const [results] = await connection.promise().query(
            "CALL loginEmpleado(?)",
            [correo]
        );

        if (!results[0] || results[0].length === 0) {
            return res.status(404).json({ mensaje: "Correo no encontrado" });
        }

        const user = results[0][0];

        if(user.Contraseña === contrasena) {
            const token = generateToken(user,user.Rol);
            res.json({ token });
        }else{
            res.status(404).json({ mensaje: "Contraseña incorrecta" });
        }

    } catch (error) {
        console.error("Error al autentificar empleado:", error);
        res.status(500).json({ mensaje: "Error al autentificar empleado" });
    }
}

const verificar = async (req, res) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ mensaje: "Token no proporcionado" });
    }

    const resultado = verificarAcceso(token);

    return res.status(resultado.status).json({ mensaje: resultado.message });
};

module.exports = {loginCliente,loginEmpleado,verificar}