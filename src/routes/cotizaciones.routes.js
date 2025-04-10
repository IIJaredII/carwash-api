const express = require("express");
const router = express.Router();
const cotizacionController = require("../controllers/cotizaciones.controller");

router.post("/", cotizacionController.insertarCotizacion);
router.get("/:id",cotizacionController.obtenerCotizacionConDetalles);

module.exports = router;