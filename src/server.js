const app = require("./app"); // Importamos la configuración de la app
require("dotenv").config({path: "../.env"});

const PORT = process.env.PORT || 3000;
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});