const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/cliente.controller");
const upload = require("../middlewares/multerConfig");

router.post("/", upload.single("foto"), clienteController.insertarCliente);
router.put("/:id", upload.single("foto"), clienteController.actualizarCliente);
router.delete("/:id", clienteController.eliminarCliente);
router.get("/", clienteController.obtenerClientes);
router.get("/:id", clienteController.obtenerClientePorID);

module.exports = router;
