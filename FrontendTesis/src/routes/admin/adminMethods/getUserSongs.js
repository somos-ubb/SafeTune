export default async function getData(params){
    let cancionesUsuario;
    try {
        const response = await fetch(`/administrator/user-songs/${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
    
        cancionesUsuario = await response.json();
    } catch (err) {
        console.error('Failed to fetch user data:', err);
    }
    return {cancionesUsuario, usuarioCanciones:params};
}
