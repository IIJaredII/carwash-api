const express = require("express");
const router = express.Router();
const trabajosController = require('../controllers/trabajos.controller');

router.get("/trabajos", trabajosController.obtenerTabajoPorEmpleado);
router.get("/detalles",trabajosController.obtenerTabajosPorCotizaciones);

module.exports = router;