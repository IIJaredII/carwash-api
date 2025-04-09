import { verificarAcceso } from "./verificarToken.js";
import { tablas, revisarCotizacion } from "../formularios/formularios.dashboard.js";
let token = "";
let detalles = [];

document.addEventListener("DOMContentLoaded", async () => {
    verificarAccesoYRedirigir();
    cambiarFormulario(2);
});


async function verificarAccesoYRedirigir() {
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        const accessGranted = await verificarAcceso(token);
        if (!accessGranted) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
    } else {
        localStorage.removeItem("token");
        window.location.href = "/";
    }
}

detalles = [
    { id: 1, servicio: "Lavado", nota: "Lavar rápido", precio: 5000 },
    { id: 2, servicio: "Pulido", nota: "Quitar rayas", precio: 8000 },
    { id: 3, servicio: "Cambio de aceite", nota: "Usar aceite sintético", precio: 12000 },
];

const cambiarFormulario = (opcion) => {
    const contenedor = document.getElementById("contenedor");

    switch (parseInt(opcion)) {
        case 1:
            contenedor.innerHTML = "";
            contenedor.innerHTML = tablas();
            break;
        case 2:
            contenedor.innerHTML = "";
            contenedor.innerHTML = revisarCotizacion();
            llenarTablaConEventos();
            break;
    }
}

function llenarTablaConEventos() {
    const detalles = [
      { id: 1, servicio: "Lavado", nota: "Lavar rápido", precio: 5000, estado: "accepted" },
      { id: 2, servicio: "Pulido", nota: "Quitar rayas", precio: 8000, estado: "waiting" },
      { id: 3, servicio: "Cambio de aceite", nota: "Usar aceite sintético", precio: 12000, estado: "denied" },
    ];
  
    const tbody = document.getElementById("ListaCotizaciones");
    tbody.innerHTML = "";
  
    detalles.forEach(item => {
      const fila = document.createElement("tr");
      fila.style.cursor = "pointer";
  
      const icono = `<img src="../img/${item.estado}.png" alt="${item.estado}" width="20" height="20">`;
  
      fila.innerHTML = `
        <td>${item.id}</td>
        <td>${item.servicio}</td>
        <td>${icono}</td>
      `;
  
      fila.addEventListener("click", () => {
        document.getElementById("notaCliente").value = item.nota;
        document.getElementById("precioCliente").value = item.precio;
      });
  
      tbody.appendChild(fila);
    });
  }
  
  