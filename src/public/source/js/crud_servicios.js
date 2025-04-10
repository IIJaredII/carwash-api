import { verificarAcceso } from "./verificarToken.js";
let token = "";
const url = "http://localhost:3000/api/";
let data = [];
let categorias =[]; 

document.addEventListener("DOMContentLoaded", async () => {
    verificarAccesoYRedirigir();
    await obtenerCategoria();
    obtenerServicios();
    cambiarFormulario(1);
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

async function obtenerCategoria() {
    const response = await fetch(url+"categorias/", {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
        }
    });

    categorias= await response.json();
}

const obtenerServicios = async () => {
    try {
        const opc = document.getElementById("opcion").value;
        const dato = document.getElementById("dato").value;
        let ruta;

        switch (parseInt(opc)) {
            case 0:
                ruta = url + "servicios/";
                document.getElementById("dato").value = "";
                break;
            case 1:
                ruta = url + "servicios/" + dato;
                break;
        }

        const response = await fetch(ruta, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error("Error al listar los servicios");
            return;
        }
        data = await response.json();
        const listaServicios = document.getElementById("listarServicios");
        listaServicios.innerHTML = "";

        data.forEach((servicio, index) => {
            const tr = document.createElement("tr");
            const categoriaServicio = categorias.find(categoria => categoria.ID == servicio.ID_Categoria);
            const nombreCategoria = categoriaServicio ? categoriaServicio.Nombre : "Sin categoría";


            tr.innerHTML = `
                <td>${servicio.ID}</td>
                <td>${servicio.Servicio}</td>
                <td>${servicio.Precio}</td>
                 <th>${nombreCategoria}</th>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarServicio(${index})">Editar</button>
                    <button class="btn btn-info btn-sm" onclick="verServicio(${index})">Ver</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarServicio(${servicio.ID})">Borrar</button>
                </td>
            `;
            listaServicios.appendChild(tr);
        });
    } catch (error) {
        console.error("Error al obtener los servicios:", error);
    }
};

function llenarSelect(){
    const selectCategorias = document.getElementById("categoria");
    if (!selectCategorias) return;
    selectCategorias.innerHTML = '<option value="">Seleccione un rol</option>';

    categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria.ID;
        option.textContent = categoria.Nombre;
        selectCategorias.appendChild(option);
    });
}

function editarServicio(index) {
    const servicio = data[index];
    cambiarFormulario(2, servicio);
}

function verServicio(index) {
    const servicio = data[index];
    cambiarFormulario(3, servicio);
}

const eliminarServicio = async (id) => {
    await fetch(url + `servicios/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "DELETE"
    });
    obtenerServicios();
};

const cambiarFormulario = (opc, servicio = {}) => {
    const formulario = document.getElementById("Formulario");

    if (opc === 1) {
        formulario.innerHTML = `
            <h2>Registrar nuevo servicio</h2>
            <form id="Formulario-agregar">
                <div class="mb-3">
                    <label for="servicio" class="form-label">Nombre del Servicio</label>
                    <input type="text" class="form-control" id="servicio" placeholder="Descriocion del servicio">
                </div>
                <div class="mb-3">
                    <label for="precio" class="form-label">Precio</label>
                    <input type="number" class="form-control" id="precio" placeholder="0.00">
                </div>
                <div class="mb-3">
                    <label for="roles" class="form-label">Rol</label>
                     <select class="form-select mb-3" aria-label="Default select example" id="categoria"></select>
                </div>
                <button type="submit" class="btn btn-primary">Agregar</button>
            </form>
        `;
        llenarSelect();
        document.getElementById("Formulario-agregar").addEventListener("submit", async (event) => {
            event.preventDefault();
            const servicio = document.getElementById("servicio").value;
            const precio = document.getElementById("precio").value;
            const idCategoria = document.getElementById("categoria").value;

            const response = await fetch(url + "servicios/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ servicio, precio, idCategoria })
            });

            if (!response.ok) {
                console.error("Error al agregar un servicio");
                return;
            }

            event.target.reset();
            obtenerServicios();
        });
    } else if (opc === 2) {
        formulario.innerHTML = `
            <h2>Editar servicio</h2>
            <form id="Formulario-editar">
                <div class="mb-3">
                    <label for="servicio" class="form-label">Nombre del Servicio</label>
                    <input type="text" class="form-control" id="servicio" value="${servicio.Servicio}">
                </div>
                <div class="mb-3">
                    <label for="precio" class="form-label">Precio</label>
                    <input type="number" class="form-control" id="precio" value="${servicio.Precio}">
                </div>
                <div class="mb-3">
                    <label for="roles" class="form-label">Rol</label>
                     <select class="form-select mb-3" aria-label="Default select example" id="categoria"></select>
                </div>
                <button type="submit" class="btn btn-primary">Editar</button>
                <button type="button" class="btn btn-secondary" onclick="cambiarFormulario(1)">Cancelar</button>
            </form>
        `;
        llenarSelect();
        document.getElementById("categoria").value = servicio.ID_Categoria;

        document.getElementById("Formulario-editar").addEventListener("submit", async (event) => {
            event.preventDefault();
            const servicio = document.getElementById("servicio").value;
            const precio = document.getElementById("precio").value;
            const idCategoria = document.getElementById("categoria").value;

            const response = await fetch(url + `servicios/${servicio.ID}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ servicio, precio, idCategoria })
            });

            if (!response.ok) {
                console.error("Error al editar el servicio");
                return;
            }

            event.target.reset();
            cambiarFormulario(1);
            obtenerServicios();
        });
    } else if (opc === 3) {
        formulario.innerHTML = `
            <h2>Ver servicio</h2>
            <form>
                <div class="mb-3">
                    <label class="form-label">Nombre del Servicio</label>
                    <input type="text" class="form-control" value="${servicio.Servicio}" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label">Precio</label>
                    <input type="number" class="form-control" value="${servicio.Precio}" disabled>
                </div>
                <div class="mb-3">
                    <label for="roles" class="form-label">Rol</label>
                     <select class="form-select mb-3" aria-label="Default select example" id="categoria"></select>
                </div>
                <button type="button" class="btn btn-secondary" onclick="cambiarFormulario(1)">Regresar</button>
            </form>
        `;
        llenarSelect();
        document.getElementById("categoria").value = servicio.ID_Categoria;
    }
};

window.editarServicio = editarServicio;
window.eliminarServicio = eliminarServicio;
window.cambiarFormulario = cambiarFormulario;
window.verServicio = verServicio;
window.obtenerServicios = obtenerServicios;
