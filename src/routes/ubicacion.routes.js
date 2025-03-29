const express = require("express");
const router = express.Router();
const ubicacionController = require('../controllers/ubicacion.controller');

router.post("/",ubicacionController.insertarUbicacion);
router.put('/',ubicacionController.acualizarUbicacion);
router.delete('/',ubicacionController.eliminarUbicacion);
router.get('/',ubicacionController.obtenerUbicaciones);
router.get('/cliente',ubicacionController.obtenerUbicacionByIDCliente);


module.exports = router;