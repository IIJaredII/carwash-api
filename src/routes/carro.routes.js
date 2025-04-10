const express = require('express');
const router = express.Router();
const carroController = require('../controllers/carro.controller');

router.post('/',carroController.insertarCarro);
router.get('/idCliente',carroController.obtenerCarroPorIdCliente);
router.get('/id',carroController.obtenerCarroPorId);
router.get('/',carroController.obtenerCarros);
router.put('/',carroController.actualizarCarro);
router.delete('/',carroController.eliminarCarro);
router.get('/modelo',carroController.obtenerModeloPorIdMarca)
router.get("/marcas",carroController.obtenerMarcas);
module.exports = router;