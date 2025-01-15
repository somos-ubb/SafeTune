export async function saveSongToBackend(track, token) {
    const { id, name, album } = track;
    // Fetch additional track information from the Spotify API
    try {
        const spotifyResponse = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Replace with your actual Spotify access token
            }
        });

        if (!spotifyResponse.ok) {
            throw new Error('Error al obtener información del track desde Spotify');
        }

        const spotifyData = await spotifyResponse.json();

        // Extract additional information from the Spotify response
        const { explicit, popularity } = spotifyData;

        // Construct the data object to send to the backend
        const data = {
            spotifyId: id,
            nombreCancion: name,
            artist: track.artists[0].name,
            album: album.name,
            explicit,
            popularity,
        };

        // Make a POST request to your backend with the constructed data
        const backendResponse = await fetch('api/save_song', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!backendResponse.ok) {
            throw new Error('Error al guardar la canción');
        }
        let response = backendResponse.json()
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}