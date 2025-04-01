import { verificarAcceso } from "./verificarToken.js";
let token = "";

document.addEventListener("DOMContentLoaded", async () => {
    verificarAccesoYRedirigir();
});


function verificarAccesoYRedirigir() {
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        const accessGranted = verificarAcceso(token);
        if (!accessGranted) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
    }else{
        window.location.href = "/";
    }
}