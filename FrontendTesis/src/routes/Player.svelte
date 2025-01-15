<!-- Player.svelte -->
<script>
    import { tokenStore } from "./utility/stores/tokenStore";
    import { volumeStore } from "./utility/stores/volumeStore";
    import millToTime from "./utility/methods/millToTime"
    import Next from './utility/svg/Next.svelte';
    import Pause from './utility/svg/Pause.svelte';
    import Play from './utility/svg/Play.svelte';
    import Previous from './utility/svg/Previous.svelte';
    import Volume from './utility/svg/Volume.svelte';
    import RepeatButton from './utility/buttons/repeatButton.svelte';
    import ShuffleButton from './utility/buttons/shuffleButton.svelte';
	import Letra from './utility/svg/Letra.svelte';
    import ReporteButton from './utility/buttons/reporteButton.svelte';
    let {
        track,
        isPaused,
        player,
        repeat = $bindable(),
        aleatorio,
        duration,
        current_time = $bindable(),
        loading,
        letra_activado = $bindable(),
        letra,
        toggleReport
    } = $props();
</script>

<div class="relative py-4 xl:py-12 items-center flex flex-col justify-center mt-12 mx-4 w-4/5 sm:w-2/3 lg:w-1/2 h-[48rem] z-10 bg-zinc-800">
    <ReporteButton {toggleReport}/>
    <img src={track.album.images[0].url} class="ml-4 sm:ml-8 mb-4 rounded-lg float-left mr-4 text-right w-96" alt={track.album.name} />
    <div class="ml-2 w-4/5">
        <div class="container flex flex-col items-center">
            <div class="text-xl xl:text-2xl mb-1.5 text-white">{track.name}</div>
            <div class="mb-4 text-white">{track.artists[0].name}</div>
        </div>
        <div class="container flex justify-center text-white mb-4">
            <p>{millToTime(current_time)}</p>
            <input type="range" min="0" max={duration} step="1" 
                bind:value={current_time} oninput={player.seek(current_time)}
                class="timebar w-full ml-2 mr-2">
            <p>{millToTime(duration)}</p>
        </div>
        <div class="container flex justify-evenly items-center xl:flex-row text-white">
            <div class="relative inline-block group">
                <input type="range" min="0" max="1" step="0.01" bind:value={$volumeStore} oninput={() => player.setVolume($volumeStore)}
                    class="absolute top-[-130px] right-0.5 left-0 volume hidden group-hover:block"/>
                <button class="cursor-pointer"><Volume value={$volumeStore * 100}/></button>
            </div>
            <RepeatButton accessToken={$tokenStore} bind:repeat/>
            <button onclick={() => { player.previousTrack() }}><Previous/></button>
            <button onclick={() => { player.togglePlay() }}>
                {#if isPaused}
                    <Play />
                {:else}
                    <Pause />
                {/if}
            </button>
            <button onclick={() => { player.nextTrack() }}><Next/></button>
            <ShuffleButton accessToken={$tokenStore} previousState={aleatorio}></ShuffleButton>
            <button disabled={!letra} onclick={() => { letra_activado = !letra_activado}}><Letra color={letra_activado} disabled={!letra}/></button>
        </div>
    </div>
    <div class="absolute bottom-2 right-2 flex items-center text-sm text-white">
        Powered by
        <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer"><img src="/SpotifyLogo.png" alt="spotifylogo" class="ml-1 h-8"></a> 
    </div>
</div>