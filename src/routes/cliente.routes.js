const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/cliente.controller");
const upload  = require("../middlewares/multerConfig");
const {verifyToken,checkRole} = require("../middlewares/authConfig");

router.post("/verificar",clienteController.verificarCorreo);
router.post("/", upload.single("foto"), clienteController.insertarCliente);
router.get("/",verifyToken, clienteController.obtenerClientes);
router.get("/ubicacion",verifyToken,clienteController.obtenerUbicaciones);
router.post("/ubicacion",verifyToken,clienteController.guardarUbicacion);

router.get("/:id",verifyToken,checkRole(["A"]), clienteController.obtenerClientePorID);
router.put("/:id", upload.single("foto"), clienteController.actualizarCliente);
router.delete("/:id", clienteController.eliminarCliente);

module.exports = router;