export function tablas (){
    const html=`
         <div class="row justify-content-center">
            <!-- Tabla 1 -->
            <div class="col-md-6">
                <div class="card shadow-lg p-4">
                    <table class="table table-striped" style="table-layout: fixed; width: 100%;">
                        <thead>
                            <tr>
                                <th style="width: 20%;">ID</th>
                                <th style="width: 80%;">Cotizacion</th>
                            </tr>
                        </thead>
                        <tbody id="ListaCotizaciones">
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Tabla 2 -->
            <div class="col-md-6">
                <div class="card shadow-lg p-4">
                    <table class="table table-striped" style="table-layout: fixed; width: 100%;">
                        <thead>
                            <tr>
                                <th style="width: 20%;">ID</th>
                                <th style="width: 80%;">Trabajo</th>
                            </tr>
                        </thead>
                        <tbody id="listaTrabajos">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    return html;
}

export function revisarCotizacion(){
    const html=`
        <div class="row justify-content-center">
            <!-- Tabla 1 -->
            <div class="col-md-4">
                <h2>Servicios solicitados</h2>
                <div class="card shadow-lg p-4">
                    <table class="table table-striped" style="table-layout: fixed; width: 100%;">
                        <thead>
                            <tr>
                                <th style="width: 10%;">ID</th>
                                <th style="width: 70%;">Servicio</th>
                                <th style="width: 20%;">Estado</th>
                            </tr>
                        </thead>
                        <tbody id="ListaCotizaciones">
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Detalles Servicio 2 -->
            <div class="col-md-4">
                <h2>Nota del cliente</h2>
                <div class="card shadow-lg p-4">
                    <div class="mb-3">
                        <label for="notaCliente" class="form-label">Nota del cliente</label>
                        <input type="text" class="form-control" id="notaCliente" placeholder="No hay nota">
                    </div>
                    <div class="mb-3">
                        <label for="precioBase" class="form-label">Precio base del servicio</label>
                        <input type="text" class="form-control" id="precioBase" placeholder="No hay precio">
                    </div>
                </div>
            </div>
            <!-- ResponderServicio 2 -->
            <div class="col-md-4">
                <h2>Responder</h2>
                <div class="card shadow-lg p-4">
                    <div class="mb-3">
                        <label for="notaAdmin" class="form-label">Añadir nota para el cliente</label>
                        <input type="text" class="form-control" id="notaAdmin" placeholder="Coloque una nota">
                    </div>
                    <div class="mb-3">
                        <label for="precioNuevo" class="form-label">Necesita modificar el precio?</label>
                        <input type="text" class="form-control" id="precioNuevo" placeholder="No hay precio">
                    </div>
                </div>
            </div>
        </div>
    `;
    return html;
}

export function revisarTrabajo(){
    const html=`
        <div class="row justify-content-center">
            <!-- Tabla 1 -->
            <div class="col-md-6">
                <div class="card shadow-lg p-4">
                    <table class="table table-striped" style="table-layout: fixed; width: 100%;">
                        <thead>
                            <tr>
                                <th style="width: 20%;">ID</th>
                                <th style="width: 80%;">Cotizacion</th>
                            </tr>
                        </thead>
                        <tbody id="ListaCotizaciones">
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Tabla 2 -->
            <div class="col-md-6">
                <div class="card shadow-lg p-4">
                    <table class="table table-striped" style="table-layout: fixed; width: 100%;">
                        <thead>
                            <tr>
                                <th style="width: 20%;">ID</th>
                                <th style="width: 80%;">Trabajo</th>
                            </tr>
                        </thead>
                        <tbody id="listaTrabajos">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    return html;
}