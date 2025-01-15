<script>
    import { tokenStore } from "../stores/tokenStore";
    import { onMount } from 'svelte';
    let { expires } = $props();
    // Function to refresh the access token

    function calculateExpirationTime() {
        const expirationDate = new Date(expires);
        const currentTime = new Date();
        const expirationTime = expirationDate.getTime() - currentTime.getTime() - 60000;
        const formatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
        });

        return expirationTime;
    }

    async function refreshAccessToken() {
        try {
            // Make a request to the refresh token endpoint
            const response = await fetch('/auth/refresh_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                // Parse the JSON response
                const data = await response.json();
                $tokenStore = data.access_token;
            } else {
                // Handle non-200 responses
                console.error('Failed to refresh access token:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error);
        }

        // Set a timer to call refreshAccessToken again after expirationTimeMs
        setTimeout(refreshAccessToken, expirationTimeFixated);
    }

    // Simulated access token expiration time (in milliseconds)
    const expirationTimeFixated = 59 * 1000 * 1000; // 59 min
    const expirationTimeRealTime = calculateExpirationTime()

    onMount(() => {
        // Set an initial delay before calling refreshAccessToken for the first time
        setTimeout(refreshAccessToken, expirationTimeRealTime); // Delay of 5 seconds
    });

</script>