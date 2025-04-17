const express = require('express');
const router = express.Router();
const carroController = require('../controllers/carro.controller');
const {verifyToken,checkRole} = require("../middlewares/authConfig");

router.post('/',verifyToken,carroController.insertarCarro);
router.get('/idCliente',verifyToken,carroController.obtenerCarroPorIdCliente);
router.get('/id',carroController.obtenerCarroPorId);
router.get('/',carroController.obtenerCarros);
router.put('/',carroController.actualizarCarro);
router.delete('/',carroController.eliminarCarro);
router.get('/modelo',carroController.obtenerModeloPorIdMarca)
router.get("/marcas",carroController.obtenerMarcas);
router.get("/mym",carroController.obtenerMarcasConModelos);
module.exports = router;