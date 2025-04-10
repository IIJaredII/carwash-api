const express = require("express");
const router = express.Router();
const servicioController = require("../controllers/servicio.controller");
const {verifyToken,checkRole} = require("../middlewares/authConfig");

router.post("/",verifyToken,servicioController.insertarServicio);
router.get("/",verifyToken,servicioController.obtenerServicios);
router.get("/:id",verifyToken,servicioController.obtenerServicioByID);
router.put("/:id",verifyToken,servicioController.actualizarServicio);
router.delete("/:id",verifyToken,servicioController.eliminarServicio);



module.exports = router;