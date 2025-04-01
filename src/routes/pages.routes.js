const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/pages/login.html"));
});

router.get("/pagina", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/pages/dashboard.html"));
});

router.get("/crud-roles", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/pages/crud_roles.html"));
});


module.exports = router;
