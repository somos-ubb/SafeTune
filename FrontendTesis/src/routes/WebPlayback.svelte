<script>
    import { onMount, onDestroy } from 'svelte';
    import ErrorTemplate from './ErrorTemplate.svelte';
    import transferirPlayback from './utility/methods/transferirPlayback'
    import { saveSongToBackend } from './utility/methods/saveSongToBackend';
    import analyzeSong from './utility/methods/analyzeSong';
	import RefreshToken from './utility/components/RefreshToken.svelte';
    import Player from './Player.svelte'
    import LoadingPage from './utility/components/LoadingPage.svelte';
    import LogoutButton from './utility/buttons/logoutButton.svelte';
    import { tokenStore } from "./utility/stores/tokenStore";
    import { volumeStore } from "./utility/stores/volumeStore";
    import { trackStore } from "./utility/stores/trackStore";
    import saveTimeListen from "./utility/methods/saveTimeListen"
    import switchAppState from "./utility/methods/switchAppState"
    import Navbar from  './utility/components/Navbar.svelte';
	import AcercaDe from './utility/components/AcercaDe.svelte';
    import Popup from './utility/components/Popup.svelte';
    import Reportar from './utility/components/Reportar.svelte';
    import SearchModule from './utility/components/SearchModule.svelte';
    import formatLyrics from './utility/methods/formatLyrics';
    import playTrack from './utility/methods/playTrack';
    import getTrack from './utility/methods/getTrack';
    import AcercaDeProyecto from './utility/components/AcercaDeProyecto.svelte';

    let track = $state({
        name: "",
        album: {
            images: [
                { url: "" }
            ]
        },
        artists: [
            { name: "" }
        ]   
        })
    let { expires, restrictivo = $bindable() } = $props();
    // variables de error
    let isPaused = $state(false);
    let isActive = $state();
    let player = $state();
    let isError = $state(false);
    let errorPlayback = false;
    let errorCode = $state();
    let messageError = $state();
    // track anterior
    let previous_track = $state();
    let previous_track_save = $state();
    //variable volumen
    //variables tracks
    let previous_tracks = $state([]);
    let next_tracks = $state([]);
    //variables barra de tiempo
    let current_time = $state(0);
    let duration = $state(0);
    let time_listen = $state(0);
    let time_saved = $state(0);
    //variable repite
    let repeat = $state(0);
    //variable aleatorio
    let aleatorio = $state(false);
    //variable cargando
    let songLoading = $state(false);
    //variable ventana acerca de
    let acerca_de = $state(false);
    let acerca_de_proyecto_comp = $state(false);
    //cambiar valor de restrictivo y lo guarda en la base de datos (IMPORTANTE PARA FUTURAS SESIONES)
    function handleRestrictivoChange() {
        restrictivo = !restrictivo
        switchAppState(restrictivo);
    }
    // contiene letra
    let letra_response;
    let letra = $state("");
    let letra_activado = $state(false);
    // variable en caso de violenta
    let esViolenta_response;
    let esViolenta = null;
    // array resultados de busqueda
    let results = $state([]);
    // on mount
    //variable para report
    let showReport = $state(false);
    
    function toggleReport(){
        showReport = !showReport;
    }
    //variable para popup
    let showPopup = $state(false);
    function togglePopup(){
        showPopup = !showPopup;
    }
    function closePopup(){
        showPopup = false;
    }
    onMount(() => {
        const savedVolume = localStorage.getItem('volume');
        if (savedVolume) {
            volumeStore.set(parseFloat(savedVolume));
        }
        const savedTrack = localStorage.getItem('track');
        if (savedTrack) {
            trackStore.set(JSON.parse(savedTrack));
        }
        // Script correspondiente al SDK
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        // Se asigna al DOM
        document.body.appendChild(script);
        // Intervalo de el tiempo de la canción
        const interval = setInterval(() => {
                if (current_time < duration && !isPaused && !songLoading) {
                    current_time += 1000;
                }
        }, 1000);
        // Intervalo de tiempo de escucha de la canción (Si la canción no se cambia este valor no se resetea)
        const realInterval = setInterval(() => {
                if (!isPaused && !songLoading) {
                    time_listen += 1000;
                }
        }, 1000);
        // Métodos del SDK cuando este esté ready
        window.onSpotifyWebPlaybackSDKReady = () => {

            // Inicializador de este
            player = new window.Spotify.Player({
                name: 'Violencia de Género',
                getOAuthToken: cb => { cb($tokenStore); },
                volume: $volumeStore,
            });

            player.addListener('ready', async ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                isActive = true;
                await transferirPlayback($tokenStore, device_id);
                await playTrack($trackStore, $tokenStore);
            });

            player.connect().then(success => {
            if (success) {
                console.log('The Web Playback SDK successfully connected to Spotify!');
            }
            })

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
                isActive = false;
            });
            // Este método se activa cada vez que hay cambios
            player.addListener('player_state_changed', ( async state => {
                if (!state) {
                    return;
                }
                /* asignación de datos desde el estado */
                previous_track = track;
                track = state.track_window.current_track;
                isPaused = state.paused;
                previous_tracks = state.track_window.previous_tracks;
                next_tracks = state.track_window.next_tracks;
                duration = state.duration;
                current_time = state.position;
                repeat = state.repeat_mode;
                aleatorio = state.shuffle;
                songLoading = state.loading;
                player.getCurrentState().then( state => { 
                    isActive = (!state)? false : true 
                });
                /* Si no hay track previo y hay modo restrictivo, se salta la canción en caso de ser violenta
                Si no hay modo restrictivo, igual analiza en caso de encuesta*/
                if(!previous_track){
                    let track_full = await getTrack($tokenStore, track.id);
                    if(track_full){
                        trackStore.set(track_full);
                    }
                    letra = "";
                    letra_response = await saveSongToBackend(track, $tokenStore);
                    letra = letra_response && letra_response.id == track.id ? letra_response.letra : "";
                    esViolenta_response = await analyzeSong(track.id);
                    esViolenta = esViolenta_response ? esViolenta_response.esViolenta : null;
                    if(esViolenta && restrictivo){
                        player.nextTrack();
                    }
                    else if(!restrictivo && esViolenta_response && esViolenta_response.input === null){
                        togglePopup();
                    }
                }
                /*Si había un track previo y hay un track nuevo (o sea, cuando hay un cambio de track) se activa
                tanto el guardado de escucha de track previo y detección de Violencia del track nuevo, se toma acción
                dependiendo si el modo es restrictivo o no*/ 
                else if(previous_track.id && previous_track.id !== track.id){
                    let track_full = await getTrack($tokenStore, track.id);
                    if(track_full){
                        trackStore.set(track_full);
                    }
                    closePopup();
                    previous_track_save = previous_track;
                    letra_activado = false;
                    letra = "";
                    time_saved = time_listen;
                    time_listen = 0;
                    await saveTimeListen(previous_track_save.id, time_saved);
                    letra_response = await saveSongToBackend(track, $tokenStore);
                    letra = letra_response && letra_response.id == track.id ? letra_response.letra : "";
                    esViolenta_response = await analyzeSong(letra_response.id);
                    esViolenta = esViolenta_response ? esViolenta_response.esViolenta : null;
                    if(esViolenta && restrictivo){
                        player.nextTrack();
                    }
                    else if(!restrictivo && esViolenta_response && esViolenta_response.input === null){
                        togglePopup();
                    }
                }
            }));

            player.on('initialization_error', ({ message }) => {
                console.error('Failed to initialize', message);
                isError = true;
                errorCode = '408'
                messageError = 'Falló la inicialización';
            });

            player.on('authentication_error', ({ message }) => {
                console.error('Failed to authenticate', message);
                isError = true;
                errorCode = '401';
                messageError = 'Falló la autenticación';
            });

            player.on('account_error', ({ message }) => {
                console.error('Failed to validate Spotify account', message);
                isError = true;
                errorCode = '401'
                messageError = 'Falló la validación de cuenta';
            });

            player.on('playback_error', ({ message }) => {
                console.error('Failed to perform playback', message);
                window.location.reload();
            });
            player.connect();
        };
        
        const unsubscribeVolume = volumeStore.subscribe(value => {
            localStorage.setItem('volume', value); 
        });

        const unsubscribeTrack = trackStore.subscribe(value => {
            localStorage.setItem('track', JSON.stringify(value)); 
        });

        onDestroy(() => {
            clearInterval(interval);
            clearInterval(realInterval);
            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
            unsubscribeVolume();
            unsubscribeTrack();
        });
    });
</script>
{#if !isError}
    {#if !isActive}
        <LoadingPage/>
    {:else}
        <div class="container flex flex-col items-center min-h-screen min-w-full bg-zinc-900">
            <Navbar {restrictivo} {handleRestrictivoChange} bind:acerca_de bind:acerca_de_proyecto_comp bind:results/>
            {#if acerca_de}
                <AcercaDe/>
            {:else if acerca_de_proyecto_comp}
                <AcercaDeProyecto/>
            {:else}
                <div class="container flex flex-row justify-center">
                    <Player
                    track={track}
                    isPaused={isPaused}
                    player={player}
                    bind:repeat
                    aleatorio={aleatorio}
                    duration={duration}
                    current_time={current_time}
                    loading={songLoading}
                    bind:letra_activado
                    letra={letra}
                    {toggleReport}
                />
                {#if results.length === 0 && letra_activado}
                    <div class="py-4 px-4 text-white mt-12 mx-4 w-4/5 sm:w-2/3 lg:w-1/2 h-[48rem] z-10 bg-zinc-800 whitespace-pre-wrap overflow-x-visible overflow-y-auto text-3xl">{letra}</div>
                {/if}
                {#if results.length > 0}
                    <SearchModule {results}/>
                {/if}
                {#if showPopup}
                    <Popup {track} {togglePopup}/>
                {/if}
                </div>
            {/if}
            {#if showReport}
                <Reportar {track} {toggleReport}/>
            {/if}
        </div>
        {#if errorPlayback}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">No está conectado</strong>
                <span class="block sm:inline">El reproductor</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
                <LogoutButton/>
            </div>
        {/if}
    {/if}
    <RefreshToken expires={expires}/>
{:else}
    <ErrorTemplate errorCode={errorCode} errorMessage={messageError}/>
{/if}
