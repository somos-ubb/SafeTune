export default async function saveTimeListen(previous_track, time_listen) {
    try {
        const response = await fetch('/api/time_listen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
            body: JSON.stringify({ previous_track, time_listen }), // <- Missing closing parenthesis here
        });

        if (!response.ok) {
            throw new Error('Failed to save time listen');
        }
        // Handle successful response if needed
    } catch (error) {
        console.error('Error:', error);
        // Handle error
    }
};