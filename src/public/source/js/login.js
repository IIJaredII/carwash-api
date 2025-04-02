import { verificarAcceso } from "./verificarToken.js";
let token = "";

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/auth/empleado", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: email, contrasena: password }),
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "/page/pagina"; 
    } else {
        document.getElementById("errorMensaje").textContent = "Correo o contraseña incorrectos";
    }
});

async function verificarAccesoYRedirigir() {
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        const accessGranted = await verificarAcceso(token);
        if (accessGranted) {
            window.location.href = "/page/pagina";
        }else{
            localStorage.removeItem("token");
        }
    }
}


verificarAccesoYRedirigir();