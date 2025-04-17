const express = require("express");
const router = express.Router();
const empleadoController = require("../controllers/empleado.controller");
const {verifyToken,checkRole} = require("../middlewares/authConfig");
const upload  = require("../middlewares/multerConfig");

router.post('/',verifyToken,upload.single("foto"),empleadoController.insertarEmpleado);
router.get('/',empleadoController.obtenerEmpleados);
router.put('/:id',upload.single("foto"),empleadoController.actualizarEmpleado);
router.delete('/:id',empleadoController.eliminarEmpleado);
router.get('/:id',empleadoController.obtenerEmpleadoById);

module.exports = router;