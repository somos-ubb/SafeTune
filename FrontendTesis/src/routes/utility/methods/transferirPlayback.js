export default async function transferirPlayback(token, device_id) {    
    const url = 'https://api.spotify.com/v1/me/player';
    const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    };

    const data = {
        device_ids: [device_id]
    };

    const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    };

    try {
        await fetch(url, requestOptions);
    } catch (error) {
        console.error('Se produjo un error al realizar la solicitud:', error);
    }
}