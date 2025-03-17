const express = require("express");
const router = express.Router();

// Ajusta la ruta de cliente.routes.js
const clienteRoutes = require("./cliente.routes");  

// Unificar rutas aquí
router.use("/cliente", clienteRoutes);

module.exports = router;