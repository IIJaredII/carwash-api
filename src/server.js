require("dotenv").config({ path: "../.env" });

const http = require("http");
const app = require("./app");
const { setupSocket } = require("./config/socket");

const server = http.createServer(app);
setupSocket(server); 

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
