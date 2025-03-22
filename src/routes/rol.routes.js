const express = require("express");
const router = express.Router();
const rolController = require("../controllers/rol.controller");
const {verifyToken,checkRole} = require("../middlewares/authConfig");

router.post("/",rolController.insertarRol);
router.get("/",rolController.obtenerRoles);
router.get("/:id",rolController.obtenerRolByID);
router.put("/:id",rolController.acualizarRol);
router.delete("/:id",rolController.eliminarRol);


module.exports = router;