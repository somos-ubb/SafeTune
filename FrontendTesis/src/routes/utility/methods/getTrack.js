export default async function realimentacion(token, track_id) {
    try {
        // Make a request to the realimentacion endpoint
        const track = await fetch(`https://api.spotify.com/v1/tracks/${track_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!track.ok) {
            console.error('Failed to get song:', response.statusText);
        }

        const response = track.json();
        return response;
    } catch (error) {
        // Handle network errors
        console.error('Network error:', error);
    }
}