const app = require("./app"); // Importamos la configuración de la app
require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});