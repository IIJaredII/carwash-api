const express = require("express");
const router = express.Router();

// Ajusta la ruta de cliente.routes.js
const clienteRoutes = require("./cliente.routes");  
const authRoutes = require("./auth.routes");
const rolRoutes = require("./rol.routes");
const empleadoRoutes = require("./empleado.routes");
const ubicacionRoutes = require("./ubicacion.routes");
const carroRoutes = require("./carro.routes")
const servicioRoutes = require("./servicios.routes");
const categoriaRoutes = require("./categorias.routes");
const cotizacionRoutes = require("./cotizaciones.routes");
const trabajosRoutes = require("./trabajos.routes");


// Unificar rutas aquí
router.use("/cliente", clienteRoutes);
router.use("/auth", authRoutes);
router.use("/roles",rolRoutes);
router.use("/empleados",empleadoRoutes);
router.use("/ubicacion",ubicacionRoutes);
router.use("/carros",carroRoutes);
router.use("/servicios",servicioRoutes);
router.use("/categorias",categoriaRoutes);
router.use("/cotizaciones",cotizacionRoutes);
router.use("/trabajos",trabajosRoutes);

module.exports = router;