const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/cliente", authController.loginCliente)
router.post("/empleado", authController.loginEmpleado);
router.get("/verificar", authController.verificar);


module.exports=router;