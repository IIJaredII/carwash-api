const express = require("express");
const router = express.Router();

// Ajusta la ruta de cliente.routes.js
const clienteRoutes = require("./cliente.routes");  
const authRoutes = require("./auth.routes");

// Unificar rutas aquí
router.use("/cliente", clienteRoutes);
router.use("/auth", authRoutes);


module.exports = router;