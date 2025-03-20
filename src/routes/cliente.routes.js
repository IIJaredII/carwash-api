const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/cliente.controller");
const upload = require("../middlewares/multerConfig");
const {verifyToken,checkRole} = require("../middlewares/authConfig");

router.post("/", upload.single("foto"), clienteController.insertarCliente);
router.put("/:id", upload.single("foto"), clienteController.actualizarCliente);
router.delete("/:id", clienteController.eliminarCliente);
router.get("/",verifyToken,checkRole(["C"]), clienteController.obtenerClientes);
router.get("/:id",verifyToken,checkRole(["A"]), clienteController.obtenerClientePorID);

module.exports = router;
