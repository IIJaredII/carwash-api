const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/cliente", authController.loginCliente) 


module.exports=router;