import { verificarAcceso } from "./verificarToken.js";
let token = "";
const url="https://hmqphld5-3000.use2.devtunnels.ms/api/";
let data = [];
let roles =[]; 

document.addEventListener("DOMContentLoaded", async () => {
    verificarAccesoYRedirigir();
    await obtenerRoles();
    obtenerEmpleados();
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

async function obtenerRoles() {
    const response = await fetch(url+"roles/", {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
        }
    });

    roles= await response.json();
}

const obtenerEmpleados = async () => {
    try {
        const opc = document.getElementById('opcion').value;
        const dato = document.getElementById('dato').value;
        let ruta;

        switch (parseInt(opc)) {
            case 0:
                ruta=url+"empleados/";
                document.getElementById('dato').value="";
            break;
            case 1:
                ruta=url+"empleados/"+dato;
            break;
        }
            

        const response = await fetch(ruta, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error('Error al listar los empleados');
            return;
        }
        data = await response.json();

        const listaEmpleados = document.getElementById('listarEmpleados');
        listaEmpleados.innerHTML = '';

        data.forEach((empleado,index) => {
            const tr = document.createElement('tr');
            const rolEmpleado = roles.find(rol => rol.ID === empleado.ID_Rol);
            const nombreRol = rolEmpleado ? rolEmpleado.Nombre : "Sin rol";

            tr.innerHTML = `
                <th>${empleado.ID}</th>
                <th>${empleado.Nombre}</th>
                <th>${nombreRol}</th>
                <th>
                    <button class="btn btn-warning btn-sm" onclick="editarCategoria(${index})">Editar</button>
                    <button class="btn btn-info btn-sm" onclick="verRol(${index})">Ver</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarCategoria(${empleado.ID})">borrar</button>
                </th>
            `;
            listaEmpleados.appendChild(tr);
        });

    } catch (error) {
        console.error('Error al obtener los roles:', error);
    }
};

function llenarSelect(){
    const selectRoles = document.getElementById("roles");
    if (!selectRoles) return;
    selectRoles.innerHTML = '<option value="">Seleccione un rol</option>';

    roles.forEach(rol => {
        const option = document.createElement("option");
        option.value = rol.ID;
        option.textContent = rol.Nombre;
        selectRoles.appendChild(option);
    });
}



function editarEmpleado(index) {
    const empleado = data[index];
    cambiarFormulario(2, empleado);
};

function verEmpleado(index) {
    const empleado = data[index];
    cambiarFormulario(3, empleado);
}


const eliminarEmpleado = async (id) => {
    await fetch(url+`empleados/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: 'DELETE'
    });
    obtenerEmpleados();
};

const cambiarFormulario = (opc, empleado) => {
    const formulario = document.getElementById('Formulario');
    if (opc === 1) {
        formulario.innerHTML = `
            <h2>Registrar nuevo Empleado</h2>
            <form id="Formulario-agregar">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre del Empleado</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre del Empleado">
                </div>
                <div class="mb-3">
                    <label for="correo" class="form-label">Correo del Empleado</label>
                    <input type="text" class="form-control" id="correo" placeholder="correo@ejemplo.com">
                </div>
                <div class="mb-3">
                    <label for="telefono" class="form-label">Telefono del Empleado</label>
                    <input type="text" class="form-control" id="telefono" placeholder="0000-0000">
                </div>
                <div class="mb-3">
                    <label for="direccion" class="form-label">Direccion</label>
                    <textarea class="form-control" id="direccion" rows="3" placeholder=""></textarea>
                </div>
                <div class="mb-3">
                    <label for="roles" class="form-label">Rol</label>
                     <select class="form-select mb-3" aria-label="Default select example" id="roles"></select>
                </div>
                <div class="mb-3">
                    <label for="contrasena" class="form-label">Contraseña del Empleado</label>
                    <input type="text" class="form-control" id="contrasena" placeholder="********">
                </div>
                <button type="submit" class="btn btn-primary">Agregar</button>
            </form>
        `;
        llenarSelect();

        document.getElementById('direccion').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });

        document.getElementById('Formulario-agregar').addEventListener('submit', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const telefono = document.getElementById("telefono").value;
            const contrasena = document.getElementById("contrasena").value;
            const direccion = document.getElementById("direccion").value;
            const rol = document.getElementById("roles").value;

            // nombre, correo, telefono, contrasena, direccion, rol
            const response = await fetch(url+'empleados/', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ nombre, correo, telefono, contrasena,direccion,rol})
            });

            if (!response.ok) {
                console.error('Error al agregar un rol');
                return;
            }

            event.target.reset();
            obtenerEmpleados();
        });

        //value="${empleado.}"
    } else if (opc === 2) {
        formulario.innerHTML = `
            <h2>Editar rol</h2>
            <form id="Formulario-editar">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre del Empleado</label>
                    <input type="text" class="form-control" id="nombre"value="${empleado.Nombre}" placeholder="Nombre del Empleado">
                </div>
                <div class="mb-3">
                    <label for="correo" class="form-label">Correo del Empleado</label>
                    <input type="text" class="form-control" id="correo" value="${empleado.Correo}" placeholder="correo@ejemplo.com">
                </div>
                <div class="mb-3">
                    <label for="telefono" class="form-label">Telefono del Empleado</label>
                    <input type="text" class="form-control" id="telefono" value="${empleado.Telefono}" placeholder="0000-0000">
                </div>
                <div class="mb-3">
                    <label for="direccion" class="form-label">Direccion</label>
                    <textarea class="form-control" id="direccion" rows="3" placeholder="">${empleado.Direccion}</textarea>
                </div>
                <div class="mb-3">
                    <label for="roles" class="form-label">Rol</label>
                     <select class="form-select mb-3" aria-label="Default select example" id="roles"></select>
                </div>
                <div class="mb-3">
                    <label for="contrasena" class="form-label">Contraseña del Empleado</label>
                    <input type="text" class="form-control" id="contrasena" placeholder="********">
                </div>
                <button type="submit" class="btn btn-primary">Editar</button>
                <button type="button" class="btn btn-secondary" onclick="cambiarFormulario(1)">Cancelar</button>
            </form>
        `;
        llenarSelect();
        document.getElementById("roles").value = empleado.ID_Rol;
        
        document.getElementById('direccion').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });
        document.getElementById('Formulario-editar').addEventListener('submit', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const telefono = document.getElementById("telefono").value;
            const contrasena = document.getElementById("contrasena").value;
            const direccion = document.getElementById("direccion").value;
            const rol = document.getElementById("roles").value;

            const response = await fetch(url+`empleados/${empleado.ID}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ nombre, correo, telefono, contrasena,direccion,rol})
            });

            if (!response.ok) {
                console.error('Error al editar la categoría');
                return;
            }

            event.target.reset();
            cambiarFormulario(1);
            obtenerEmpleados();
        });
    }else if(opc ==3){
        formulario.innerHTML = `
            <h2>Ver rol</h2>
            <form id="Formulario-ver">
            <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre del Empleado</label>
                    <input type="text" class="form-control" id="nombre" value="${empleado.Nombre}" placeholder="Nombre del Empleado" readonly>
                </div>
                <div class="mb-3">
                    <label for="correo" class="form-label">Correo del Empleado</label>
                    <input type="text" class="form-control" id="correo" value="${empleado.Correo}" placeholder="correo@ejemplo.com" readonly>
                </div>
                <div class="mb-3">
                    <label for="telefono" class="form-label">Telefono del Empleado</label>
                    <input type="text" class="form-control" id="telefono" value="${empleado.Telefono}" placeholder="0000-0000" readonly>
                </div>
                <div class="mb-3">
                    <label for="direccion" class="form-label">Direccion</label>
                    <textarea class="form-control" id="direccion" rows="3" placeholder="" readonly>${empleado.Direccion}</textarea>
                </div>
                <div class="mb-3">
                    <label for="roles" class="form-label">Rol</label>
                    <select class="form-select mb-3" aria-label="Default select example" id="roles" disabled></select>
                </div>

                <button type="button" class="btn btn-secondary" onclick="cambiarFormulario(1)">Regresar</button>
            </form>
        `;
        llenarSelect();
        document.getElementById("roles").value = empleado.ID_Rol;
    }
};

window.editarCategoria = editarEmpleado;
window.eliminarCategoria = eliminarEmpleado;
window.cambiarFormulario = cambiarFormulario;
window.verRol = verEmpleado;
window.obtenerEmpleados = obtenerEmpleados;
