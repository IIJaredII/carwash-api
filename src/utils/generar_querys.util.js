// Función utilitaria para generar la consulta SQL
const generarInsertQuery = (tabla, columnas, valores) => {
    
    if (columnas.length !== valores.length) {
        throw new Error("El número de columnas no coincide con el número de valores");
    }
    // Crear la parte de las columnas (por ejemplo, "Nombre, Correo, Telefono")
    const columnasString = columnas.join(", ");

    // Crear la parte de los placeholders (?) (por ejemplo, "?, ?, ?")
    const placeholders = valores.map(() => "?").join(", ");

    // Generar y retornar la consulta SQL
    return `
        INSERT INTO ${tabla} (${columnasString}) 
        VALUES (${placeholders});
    `;
};

generarSelectQuery = (tabla, columnas) => {
    const columnasString = columnas.join(", ");

    return `
        SELECT ${columnasString}
        FROM ${tabla}
    `;
}

export{
    generarInsertQuery,
}