import { verificarAcceso } from "./verificarToken.js";
let token = "";
const url = "https://hmqphld5-3000.use2.devtunnels.ms/api/";
let data = [];

document.addEventListener("DOMContentLoaded", async () => {
    await verificarAccesoYRedirigir();
    await obtenerCategorias();
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

const obtenerCategorias = async () => {
    try {
        const opc = document.getElementById('opcion').value;
        const dato = document.getElementById('dato').value;
        let ruta;

        switch (parseInt(opc)) {
            case 0:
                ruta = url + "categorias/";
                document.getElementById('dato').value = "";
                break;
            case 1:
                ruta = url + "categorias/" + dato;
                break;
        }

        const response = await fetch(ruta, {
            method: 'GET',
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
            console.error('Error al listar las categorías');
            return;
        }

        data = await response.json();
        const listaCategoria = document.getElementById('listarCategorias');
        listaCategoria.innerHTML = '';

        data.forEach((categoria, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <th>${categoria.ID}</th>
                <th>${categoria.Nombre}</th>
                <th>${categoria.Descripcion}</th>
                <th>
                    <button class="btn btn-warning btn-sm" onclick="editarCategoria(${index})">Editar</button>
                    <button class="btn btn-info btn-sm" onclick="verCategoria(${index})">Ver</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarCategoria(${categoria.ID})">Borrar</button>
                </th>
            `;
            listaCategoria.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
    }
};

function editarCategoria(index) {
    const categoria = data[index];
    cambiarFormulario(2, categoria);
};

function verCategoria(index) {
    const categoria = data[index];
    cambiarFormulario(3, categoria);
}

const eliminarCategoria = async (id) => {
    await fetch(url + `categorias/${id}`, {
        headers: { "Authorization": `Bearer ${token}` },
        method: 'DELETE'
    });
    obtenerCategorias();
};

const cambiarFormulario = (opc, categoria) => {
    const formulario = document.getElementById('Formulario');
    if (opc === 1) {
        formulario.innerHTML = `
            <h2>Registrar nueva categoría</h2>
            <form id="Formulario-agregar">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre de la categoría</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre de la categoría">
                </div>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <textarea class="form-control" id="descripcion" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Agregar</button>
            </form>
        `;

        document.getElementById('Formulario-agregar').addEventListener('submit', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;

            const response = await fetch(url + 'categorias/', {
                method: 'POST',
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, descripcion })
            });

            if (!response.ok) {
                console.error('Error al agregar una categoría');
                return;
            }

            event.target.reset();
            obtenerCategorias();
        });
    } else if (opc === 2) {
        formulario.innerHTML = `
            <h2>Editar categoría</h2>
            <form id="Formulario-editar">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre de la categoría</label>
                    <input type="text" class="form-control" id="nombre" value="${categoria.Nombre}">
                </div>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <textarea class="form-control" id="descripcion" rows="3">${categoria.Descripcion}</textarea>
                </div>
                <button type="submit" class="btn btn-primary">Editar</button>
                <button type="button" class="btn btn-secondary" onclick="cambiarFormulario(1)">Cancelar</button>
            </form>
        `;

        document.getElementById('Formulario-editar').addEventListener('submit', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;

            const response = await fetch(url + `categorias/${categoria.ID}`, {
                method: 'PUT',
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, descripcion })
            });

            if (!response.ok) {
                console.error('Error al editar la categoría');
                return;
            }

            event.target.reset();
            cambiarFormulario(1);
            obtenerCategorias();
        });
    } else if (opc === 3) {
        formulario.innerHTML = `
            <h2>Ver categoría</h2>
            <form id="Formulario-ver">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre de la categoría</label>
                    <input type="text" class="form-control" id="nombre" value="${categoria.Nombre}" disabled>
                </div>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <textarea class="form-control" id="descripcion" rows="3" disabled>${categoria.Descripcion}</textarea>
                </div>
                <button type="button" class="btn btn-secondary" onclick="cambiarFormulario(1)">Regresar</button>
            </form>
        `;
    }
};

window.editarCategoria = editarCategoria;
window.eliminarCategoria = eliminarCategoria;
window.cambiarFormulario = cambiarFormulario;
window.verCategoria = verCategoria;
window.obtenerCategorias = obtenerCategorias;
