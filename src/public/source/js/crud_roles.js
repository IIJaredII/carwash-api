import { verificarAcceso } from "./verificarToken.js";
let token = "";
const url="http://localhost:3000/api/";
let data = [];  // Guardará los datos globalmente



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


const obtenerRoles = async () => {
    try {
        const opc = document.getElementById('opcion').value;
        const dato = document.getElementById('dato').value;

        /*switch (parseInt(opc)) {
            case 1:
                url = "roles/";
            break;
            case 2:
                url= "roles/"+dato;
            break;
        }*/
            const ruta =url+"roles/";

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
        const listaCategoria = document.getElementById('listarCategorias');
        listaCategoria.innerHTML = '';

        data.forEach((rol,index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <th>${rol.ID}</th>
                <th>${rol.Nombre}</th>
                <th>${rol.Descripcion}</th>
                <th>
                    <button class="btn" onclick="editarCategoria(${index})">Editar</button>
                    <button class="btn" onclick="eliminarCategoria(${rol.ID})">borrar</button>
                </th>
            `;
            listaCategoria.appendChild(tr);
        });
        
        if(opc===0){
            document.getElementById('dato').value="";
        }

    } catch (error) {
        console.error('Error al obtener los roles:', error);
    }
};



function editarRol(index) {
    const rol = data[index];
    cambiarFormulario(2, rol);
};

const eliminarRol = async (id) => {
    await fetch(url+`roles/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: 'DELETE'
    });
    obtenerRoles();
};

const cambiarFormulario = (opc, rol) => {
    const formulario = document.getElementById('Formulario');
    if (opc === 1) {
        formulario.innerHTML = `
            <h2>Registrar nueva categoría</h2>
            <form id="Formulario-agregar">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre del rol</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre de la categoría">
                </div>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <textarea class="form-control" id="descripcion" rows="3" placeholder=""></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Agregar</button>
            </form>
        `;
        document.getElementById('descripcion').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });

        document.getElementById('Formulario-agregar').addEventListener('submit', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;

            console.log(nombre);
            console.log(descripcion);

            const response = await fetch(url+'roles/', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"  // Asegura que el servidor reciba JSON
                },
                body: JSON.stringify({ nombre, descripcion })
            });

            if (!response.ok) {
                console.error('Error al agregar un rol');
                return;
            }

            event.target.reset();
            obtenerRoles();
        });
    } else if (opc === 2) {
        formulario.innerHTML = `
            <h2>Editar rol</h2>
            <form id="Formulario-editar">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre del rol</label>
                    <input type="text" class="form-control" id="nombre" value="${rol.Nombre}" placeholder="Nombre de la categoría">
                </div>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <textarea class="form-control" id="descripcion" rows="3" placeholder="">${rol.Descripcion}</textarea>
                </div>
                <button type="submit" class="btn btn-primary">Editar</button>
                <button type="button" class="btn btn-secondary" onclick="cambiarFormulario(1)">Cancelar</button>
            </form>
        `;
        
        document.getElementById('descripcion').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });
        document.getElementById('Formulario-editar').addEventListener('submit', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;

            const response = await fetch(url+`roles/${rol.ID}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"  // Asegura que el servidor reciba JSON
                },
                body: JSON.stringify({ nombre, descripcion })
            });

            if (!response.ok) {
                console.error('Error al editar la categoría');
                return;
            }

            event.target.reset();
            cambiarFormulario(1);
            obtenerRoles();
        });
    }
};

window.editarCategoria = editarRol;
window.eliminarCategoria = eliminarRol;
window.cambiarFormulario = cambiarFormulario;

document.addEventListener('DOMContentLoaded', () => {
    obtenerRoles();
    cambiarFormulario(1); 
});