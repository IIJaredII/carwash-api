const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/cliente.controller");

// Definir la ruta GET para obtener clientes
router.get("/", clienteController.obtenerClientes);

module.exports = router;
