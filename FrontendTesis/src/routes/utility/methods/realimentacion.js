export default async function realimentacion(realimentacion, track_id) {
    try {
        // Make a request to the realimentacion endpoint
        const response = await fetch('/api/realimentacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ realimentacion, track_id })
        });
        
        if (!response.ok) {
            console.error('Failed to refresh state:', response.statusText);
        }
    } catch (error) {
        // Handle network errors
        console.error('Network error:', error);
    }
}