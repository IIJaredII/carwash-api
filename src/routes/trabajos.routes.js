const express = require("express");
const router = express.Router();
const trabajosController = require('../controllers/trabajos.controller');
const {verifyToken,checkRole} = require("../middlewares/authConfig");
const upload  = require("../middlewares/multerConfig");

router.get("/faltantes",verifyToken, trabajosController.obtenerTabajoPorEmpleado);
router.get("/detalles",verifyToken,trabajosController.obtenerTabajosPorCotizaciones);
router.put("/",verifyToken,trabajosController.revisarDetallesCotizacion);
router.put("/empezar/:id",verifyToken,trabajosController.emplezarTrabajo);
router.get("/infoGeneral/:id",verifyToken,trabajosController.obtenerDatosGeneralesTrabajo);
router.get("/infoDetalles/:id",verifyToken,trabajosController.obtenerServiciosDeTrabajo);
router.put("/check/:id&:idCotizacion", verifyToken,trabajosController.marcarTrabajoCompletado);
router.post("/evidencia",verifyToken,upload.single("file"),trabajosController.subirEvidencia);
router.put("/terminar/:id",verifyToken,trabajosController.terminarTrabajo);

module.exports = router;