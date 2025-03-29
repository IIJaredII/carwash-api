const express = require("express");
const router = express.Router();

// Ajusta la ruta de cliente.routes.js
const clienteRoutes = require("./cliente.routes");  
const authRoutes = require("./auth.routes");
const rolRoutes = require("./rol.routes");
const empleadoRoutes = require("./empleado.routes");
const ubicacionRoutes = require("./ubicacion.routes");

// Unificar rutas aquí
router.use("/cliente", clienteRoutes);
router.use("/auth", authRoutes);
router.use("/roles",rolRoutes);
router.use("/empleados",empleadoRoutes);
router.use("/ubicacion",ubicacionRoutes);

module.exports = router;