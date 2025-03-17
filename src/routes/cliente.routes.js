const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/cliente.controller");

router.post("/", clienteController.insertarCliente);
router.put("/:id", clienteController.actualizarCliente);
router.delete("/:id", clienteController.eliminarCliente);
router.get("/", clienteController.obtenerClientes);
router.get("/:id", clienteController.obtenerClientePorID);

module.exports = router;
