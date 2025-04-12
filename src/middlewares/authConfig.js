require("dotenv").config({path: "../.env"});
const { json } = require("express");
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

const verificarAcceso = (token) => {
    if (!token) return { status: 401, message: "No autorizado" };

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        return { status: 202, message: "OK", user: decoded };
    } catch (error) {
        return { status: 401, message: "Token inválido" };
    }
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({ error: "No tienes permisos para acceder a esta ruta" });
        }
        next();
    };
};


const generateToken = (time,user,rol) => {
    const payload = {
        id: user.ID,
        username: user.Nombre,
        rol:rol
    };
    console.log("Generando token para: " , payload);
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: time });
    return token;
};

module.exports = { verifyToken, checkRole, generateToken,verificarAcceso };