import { verificarAcceso } from "./verificarToken.js";
let token = "";
const url="http://localhost:3000/api/";
let data = []; 

document.addEventListener("DOMContentLoaded", async () => {
    verificarAccesoYRedirigir();
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
    }else{
        localStorage.removeItem("token");
        window.location.href = "/";
    }
}

const obtenerServicios = async () => {
    try {
        const opc = document.getElementById('opcion').value;
        const dato = document.getElementById('dato').value;
        let ruta;

        switch (parseInt(opc)) {
            case 0:
                ruta=url+"servicios/";
                document.getElementById('dato').value="";
            break;
            case 1:
                ruta=url+"servicios/"+dato;
            break;
        }
            

        const response = await fetch(ruta, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error('Error al listar los roles');
            return;
        }
        data = await response.json();
        const listaServicios = document.getElementById('listarServicios');
        listaServicios.innerHTML = '';

        data.forEach((servicio,index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <th>${servicio.ID}</th>
                <th>${servicio.Descripcion}</th>
                <th>${servicio.Precio}</th>
                <th>
                    <button class="btn" onclick="editarServicio(${index})">Editar</button>
                    <button class="btn" onclick="verServicio(${index})">Ver</button>
                    <button class="btn" onclick="eliminarServicio(${servicio.ID})">borrar</button>
                </th>
            `;
            listaServicios.appendChild(tr);
        });

    } catch (error) {
        console.error('Error al obtener los roles:', error);
    }
};



function editarServicio(index) {
    const servicio = data[index];
    cambiarFormulario(2, servicio);
};

function verServicio(index) {
    const servicio = data[index];
    cambiarFormulario(3, servicio);
}


const eliminarServicio = async (id) => {
    await fetch(url+`servicios/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: 'DELETE'
    });
    obtenerServicios();
};

const cambiarFormulario = (opc, servicio) => {
    const formulario = document.getElementById('Formulario');
    if (opc === 1) {
        formulario.innerHTML = `
            <h2>Registrar nuevo servicio</h2>
            <form id="Formulario-agregar">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre del servicio</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre de la categoría">
                </div>
                <div class="mb-3">
                    <label for="precio" class="form-label">Precio</label>
                    <textarea class="form-control" id="precio" rows="3" placeholder=""></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Agregar</button>
            </form>
        `;

        document.getElementById('Formulario-agregar').addEventListener('submit', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const precio = document.getElementById('precio').value;

            const response = await fetch(url+'servicios/', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"  // Asegura que el servidor reciba JSON
                },
                body: JSON.stringify({ nombre, precio })
            });

            if (!response.ok) {
                console.error('Error al agregar un servicio');
                return;
            }

            event.target.reset();
            obtenerServicios();
        });
    } else if (opc === 2) {
        formulario.innerHTML = `
            <h2>Editar rol</h2>
            <form id="Formulario-editar">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre del servicio</label>
                    <input type="text" class="form-control" id="nombre" value="${servicio.Descripcion}" placeholder="Nombre de la categoría">
                </div>
                <div class="mb-3">
                    <label for="precio" class="form-label">Precio</label>
                    <textarea class="form-control" id="precio" rows="3" placeholder="">${servicio.Precio}</textarea>
                </div>
                <button type="submit" class="btn btn-primary">Editar</button>
                <button type="button" class="btn btn-secondary" onclick="cambiarFormulario(1)">Cancelar</button>
            </form>
        `;
        
        document.getElementById('Formulario-editar').addEventListener('submit', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const precio = document.getElementById('precio').value;

            const response = await fetch(url+`servicios/${servicio.ID}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ nombre, precio })
            });

            if (!response.ok) {
                console.error('Error al editar la categoría');
                return;
            }

            event.target.reset();
            cambiarFormulario(1);
            obtenerServicios();
        });
    }else if(opc ==3){
        formulario.innerHTML = `
            <h2>Ver rol</h2>
            <form id="Formulario-ver">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre del rol</label>
                    <input type="text" class="form-control" id="nombre" value="${servicio.Descripcion}" disabled>
                </div>
                <div class="mb-3">
                    <label for="precio" class="form-label">Descripción</label>
                    <textarea class="form-control" id="precio" rows="3" disabled>${servicio.Precio}</textarea>
                </div>
                <button type="button" class="btn btn-secondary" onclick="cambiarFormulario(1)">Regresar</button>
            </form>
        `;
    }
};

window.editarServicio = editarServicio;
window.eliminarServicio = eliminarServicio;
window.cambiarFormulario = cambiarFormulario;
window.verServicio = verServicio;
window.obtenerServicios = obtenerServicios;