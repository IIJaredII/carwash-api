
export const verificarAcceso = async (token) => {
    try {
        const response = await fetch("/api/auth/verificar", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Acceso autorizado:", data.message);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

//async function verificarAcceso() {  
//} 
