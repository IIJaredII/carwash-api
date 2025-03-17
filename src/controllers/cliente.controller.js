// Simulación de datos (en lugar de una base de datos por ahora)
const clientes = [
    { id: 1, nombre: "Juan Pérez", telefono: "123-4567" },
    { id: 2, nombre: "Ana Gómez", telefono: "987-6543" }
];

exports.obtenerClientes = (req, res) => {
    res.json(clientes);
};
