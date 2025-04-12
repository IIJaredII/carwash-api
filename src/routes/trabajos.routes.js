const express = require("express");
const router = express.Router();
const trabajosController = require('../controllers/trabajos.controller');

router.get("/faltantes", trabajosController.obtenerTabajoPorEmpleado);
router.get("/detalles",trabajosController.obtenerTabajosPorCotizaciones);
router.put("/", trabajosController.revisarDetallesCotizacion);

module.exports = router;