export default async function analyzeSong(id) {

    // Fetch additional track information from the Spotify API
    try {
        const data = {
            spotifyId: id,
        };

        // Make a POST request to your backend with the constructed data
        const backendResponse = await fetch('api/check_song', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!backendResponse.ok) {
            throw new Error('Error al guardar la canción');
        }
        let response = backendResponse.json();
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}