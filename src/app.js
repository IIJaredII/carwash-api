const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const pagesRoutes = require("./routes/pages.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

// Usar rutas backend
app.use("/api", routes);

//usar rutas Frontend
app.get("/", (req, res) => {
    res.redirect("/page/login");
});

app.use("/source", express.static("public/source"));

app.use("/page", pagesRoutes);

module.exports = app;