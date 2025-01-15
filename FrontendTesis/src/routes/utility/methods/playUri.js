export default async function playUri(element, token) {
    
    try {
        const response = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            context_uri: element.uri,
            position_ms: 0
        })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok. Status: ${response.status}, ${response.statusText}. Response: ${errorText}`);
        }

    } catch (error) {
        console.error('Error reproduciendo la canción:', error);
    }
}