<script>
    import Random from "../svg/Random.svelte";
    let { accessToken, previousState } = $props();

    async function setShuffleState() {
        const url = 'https://api.spotify.com/v1/me/player/shuffle?state=' + !previousState;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });

            if (!response.ok) {
                throw new Error('Failed to set shuffle state');
            }

        } catch (error) {
            console.error('Error setting shuffle state:', error);
        }
    }
</script>

<button onclick={setShuffleState}>
    {#if previousState}
        <Random color={'verde'}/>
    {:else}
        <Random color={'blanco'}/>
    {/if}
</button>
