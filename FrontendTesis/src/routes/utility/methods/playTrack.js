export default async function playTrack(track, token) {
    try {
        const artistId = track.artists[0].id;
        // Fetch artist's top tracks
        const topTracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!topTracksResponse.ok) {
            const errorText = await topTracksResponse.text();
            throw new Error(`Network response was not ok. Status: ${topTracksResponse.status}, ${topTracksResponse.statusText}. Response: ${errorText}`);
        }

        const topTracksData = await topTracksResponse.json();

        // Get URIs for the top tracks, excluding the current track
        const topTrackUris = topTracksData.tracks
            .filter(t => t.id !== track.id)
            .map(t => t.uri);

        // If no top tracks are available, play only the current track
        if (topTrackUris.length === 0) {
            await play([track.uri], token);
            return;
        }

        // Optionally, fetch tracks from the artist's albums
        const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&market=ES&limit=5`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (albumsResponse.ok) {
            const albumsData = await albumsResponse.json();

            for (const album of albumsData.items) {
                const albumTracksResponse = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks?market=ES`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (albumTracksResponse.ok) {
                    const albumTracksData = await albumTracksResponse.json();
                    const albumTrackUris = albumTracksData.items.map(t => t.uri);
                    topTrackUris.push(...albumTrackUris);
                }
            }
        }

        // Remove duplicates and construct the final playlist
        const uniqueUris = Array.from(new Set([track.uri, ...topTrackUris]));

        // Play the tracks
        await play(uniqueUris, token);

    } catch (error) {
        console.error('Error playing track and queuing recommendations:', error);
    }
}

async function play(uris, token) {
    try {
        const response = await fetch('https://api.spotify.com/v1/me/player/play', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uris,
                position_ms: 0
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok. Status: ${response.status}, ${response.statusText}. Response: ${errorText}`);
        }

    } catch (error) {
        console.error('Error playing track:', error);
    }
}