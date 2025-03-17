const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Usar rutas
app.use("/api", routes);

module.exports = app;
