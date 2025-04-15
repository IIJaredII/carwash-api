const express = require("express");
const router = express.Router();
const trabajosController = require('../controllers/trabajos.controller');
const {verifyToken,checkRole} = require("../middlewares/authConfig");

router.get("/faltantes",verifyToken, trabajosController.obtenerTabajoPorEmpleado);
router.get("/detalles",verifyToken,trabajosController.obtenerTabajosPorCotizaciones);
router.put("/",verifyToken,trabajosController.revisarDetallesCotizacion);
router.put("/empezar/:id",verifyToken,trabajosController.emplezarTrabajo);
router.get("/infoGeneral/:id",verifyToken,trabajosController.obtenerDatosGeneralesTrabajo);
router.get("/infoDetalles/:id",verifyToken,trabajosController.obtenerServiciosDeTrabajo);
router.put("/check/:id&:idCotizacion", verifyToken,trabajosController.marcarTrabajoCompletado);
router.put("",verifyToken,);

module.exports = router;