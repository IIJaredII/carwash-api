require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "Token requerido" });

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token inválido" });
        req.user = decoded;
        next();
    });
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({ error: "No tienes permisos para acceder a esta ruta" });
        }
        next();
    };
};

const generateToken = (user,rol) => {
    const payload = {
        id: user.ID,
        username: user.Nombre,
        rol:rol
    };
    console.log("Generando token para: " , payload);
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
};

module.exports = { verifyToken, checkRole, generateToken };