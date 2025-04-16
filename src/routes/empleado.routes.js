const express = require("express");
const router = express.Router();
const empleadoController = require("../controllers/empleado.controller");
const {verifyToken,checkRole} = require("../middlewares/authConfig");
const { uploadPerfil } = require("../middlewares/multerConfig");

router.post('/',verifyToken,uploadPerfil.single("foto"),empleadoController.insertarEmpleado);
router.get('/',empleadoController.obtenerEmpleados);
router.put('/:id',uploadPerfil.single("foto"),empleadoController.actualizarEmpleado);
router.delete('/:id',empleadoController.eliminarEmpleado);
router.get('/:id',empleadoController.obtenerEmpleadoById);

module.exports = router;