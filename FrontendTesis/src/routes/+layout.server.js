export async function load({ cookies }){
    let access_token = cookies.get('access_token') || null;
    let expires = cookies.get('expires') || null;
    let restrictivo = cookies.get('restrictivo') || null;
    return {
        access_token,
        expires,
        restrictivo:!!parseInt(restrictivo)
    }
}