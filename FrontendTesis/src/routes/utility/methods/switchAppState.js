export default async function switchAppState(restrictivo) {
    try {
        // Make a request to the refresh token endpoint
        const response = await fetch(`/api/switch_state?restrictivo=${+restrictivo}`, {
            method: 'GET',
        });
        
        if (!response.ok) {

            console.error('Failed to refresh state:', response.statusText);
        }
    } catch (error) {
        // Handle network errors
        console.error('Network error:', error);
    }
}