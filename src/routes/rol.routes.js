const express = require("express");
const router = express.Router();
const rolController = require("../controllers/rol.controller");
const {verifyToken,checkRole} = require("../middlewares/authConfig");

router.post("/",verifyToken,rolController.insertarRol);
router.get("/",verifyToken,rolController.obtenerRoles);
router.get("/:id",verifyToken,rolController.obtenerRolByID);
router.put("/:id",verifyToken,rolController.acualizarRol);
router.delete("/:id",verifyToken,rolController.eliminarRol);


module.exports = router;