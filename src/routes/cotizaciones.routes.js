const express = require("express");
const router = express.Router();
const cotizacionController = require("../controllers/cotizaciones.controller");
const { verifyToken} = require("../middlewares/authConfig");

router.post("/",verifyToken,cotizacionController.insertarCotizacion);
router.get("/pendientes",verifyToken,cotizacionController.obtenerCotizacionDetallePendiente);
router.get("/:id",verifyToken,cotizacionController.obtenerCotizacionConDetalles);


module.exports = router;