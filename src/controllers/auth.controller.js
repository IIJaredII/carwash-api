const connection = require("../config/db");
const {verifyToken,checkRole,generateToken} = require("../middlewares/authConfig");

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
            res.json({ token });
        }else{
            res.status(404).json({ mensaje: "Contraseña incorrecta" });
        }

    } catch (error) {
        console.error("Error al autentificar cliente:", error);
        res.status(500).json({ mensaje: "Error al autentificar cliente" });
    }
}

module.exports = {loginCliente}