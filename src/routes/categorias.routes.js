const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaServicio.controller");
const {verifyToken,checkRole} = require("../middlewares/authConfig");

router.post("/",categoriaController.insertarCategoriaServicio);
router.get("/",categoriaController.obtenerCategoriasServicios);
router.get("/:id",categoriaController.obtenerCategoriaServicioByID);
router.put("/:id",categoriaController.actualizarCategoriaServicio);
router.delete("/:id",categoriaController.eliminarCategoriaServicio);

module.exports = router;