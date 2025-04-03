import { verificarAcceso } from "./verificarToken.js";
let token = "";

document.addEventListener("DOMContentLoaded", async () => {
    verificarAccesoYRedirigir();
});


async function verificarAccesoYRedirigir() {
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        const accessGranted = await verificarAcceso(token);
        if (!accessGranted) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
    }else{
        localStorage.removeItem("token");
        window.location.href = "/";
    }
}