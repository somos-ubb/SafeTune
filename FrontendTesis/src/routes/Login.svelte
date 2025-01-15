<script>
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    let visible = $state(false); // Establecer visible en true para que el elemento se muestre inicialmente
    onMount(() => {
        visible = true;
    });
</script>

<div class="bg-zinc-900 min-h-screen pt-5">
    {#if visible}
        <div class="flex flex-col justify-evenly items-center pt-[25vh] min-h-[75vh]" in:fly={{ y: 400, duration: 4000 }}>
            <div class="flex flex-col items-center w-4/5 md:w-3/5 2xl:w-2/5">
                <h1 class="font-bold text-4xl xl:text-5xl text-white text-center">Música sin Violencia</h1>
                <hr class="h-5 w-full mt-3 border-t-2 border-green-700"/>
                <h1 class="text-2xl xl:text-3xl text-white text-center">Contra la violencia de género</h1>
            </div>
            <a href="/auth/login" class="bg-green-500 hover:bg-green-700 font-bold text-white py-2 px-4 rounded-full text-lg xl:text-xl">Accede con Spotify</a>
            <div></div>
            <div class="flex flex-row"><p class="text-white">Powered By</p><a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer"><img src="/SpotifyLogo.png" alt="spotifylogo" class="ml-1 h-8"></a> </div>
        </div>
    {/if}
</div>

