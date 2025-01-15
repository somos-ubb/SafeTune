<script>
    import downloadJSONAsCSV from '../adminMethods/csvMethods'
    let { canciones } = $props();
    // Reactive variables for filters
    let artistaSearch = $state('');
    let selectedArtista = $state('');
    let explicitFilter = $state('both'); // 'both', 'explicit', 'non-explicit'
    let violentFilter = $state('both'); // 'both', 'violent', 'non-violent'

    // Derived filtered canciones
    let filteredCanciones = $derived(canciones.filter(cancion => {
        return (
            (selectedArtista === '' || cancion.artista === selectedArtista) &&
            (explicitFilter === 'both' || (explicitFilter === 'explicit' && cancion.explicita) || (explicitFilter === 'non-explicit' && !cancion.explicita)) &&
            (violentFilter === 'both' || (violentFilter === 'violent' && cancion.esViolenta) || (violentFilter === 'non-violent' && !cancion.esViolenta))
        );
    }));

    // Derived artista suggestions based on search input
    let artistaSuggestions = $derived([...new Set(canciones.map(c => c.artista))]
        .filter(artista => artista.toLowerCase().includes(artistaSearch.toLowerCase())));
    // Function to reset filters
    function resetFilters() {
        artistaSearch = '';
        selectedArtista = '';
        explicitFilter = 'both';
        violentFilter = 'both';
    }
    function selectArtista(artista) {
        selectedArtista = artista;
        artistaSearch = ''; // Clear search input after selection
    }
</script>

<div class="container mx-auto p-4 flex">
    <!-- Filters Section -->
    <aside class="w-1/4 p-4 bg-gray-100 rounded-lg mr-4">
        <h2 class="text-xl font-bold mb-4">Filtros</h2>
        
        <!-- artista Filter -->
        <div class="mb-4 relative">
            <p class="block text-gray-700">Artista:</p>
            <input 
                type="text" 
                bind:value={artistaSearch} 
                class="mt-1 block w-full p-2 border border-gray-300 rounded-lg" 
                placeholder="Buscar artista..."
            />
            {#if artistaSearch !== ''}
                <ul class="absolute bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-40 overflow-auto z-10">
                    {#each artistaSuggestions as artista}
                        <li class="p-2 hover:bg-gray-200 cursor-pointer">
                            <button 
                                class="w-full text-left" 
                                onclick={() => selectArtista(artista)}
                            >
                                {artista}
                            </button>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>

        <!-- Explicit Filter -->
        <div class="mb-4">
            <p class="block text-gray-700">Explícito:</p>
            <select bind:value={explicitFilter} class="mt-1 block w-full p-2 border border-gray-300 rounded-lg">
                <option value="both">Mostrar Ambos</option>
                <option value="explicit">Mostrar Solo Explícitos</option>
                <option value="non-explicit">Mostrar Solo No Explícitos</option>
            </select>
        </div>
        
        <!-- Violent Filter -->
        <div>
            <p class="block text-gray-700">Violento:</p>
            <select bind:value={violentFilter} class="mt-1 block w-full p-2 border border-gray-300 rounded-lg">
                <option value="both">Mostrar Ambos</option>
                <option value="violent">Mostrar Solo Violentos</option>
                <option value="non-violent">Mostrar Solo No Violentos</option>
            </select>
        </div>
        <!-- Reset Button -->
        <button 
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold my-4 py-2 px-4 rounded" 
            onclick={resetFilters}
        >
            Resetear Filtros
        </button>
    </aside>

    <!-- Songs List Section -->
    <div class="w-3/4">
        <h1 class="text-2xl font-bold mb-4">Lista de Canciones</h1>
        <button class="bg-violet-300 rounded" onclick={()=>downloadJSONAsCSV(canciones,'canciones')}>Descargar CSV de canciones</button>
        <ul class="space-y-4">
            {#each filteredCanciones as cancion}
                <li class="bg-white shadow-md rounded-lg p-4">
                    <h2 class="text-xl font-semibold">{cancion.nombre}</h2>
                    <p class="text-gray-600">Artista: {cancion.artista}</p>
                    {#if cancion.album}
                        <p class="text-gray-600">Álbum: {cancion.album}</p>
                    {/if}
                    {#if cancion.letra}
                        <p class="text-gray-600 mt-2">Letra: {cancion.letra}</p>
                    {/if}
                    <p class="text-gray-600">Idioma: {cancion.idioma}</p>
                    <p class="text-gray-600">Popularidad: {cancion.popularidad}</p>
                    <p class="text-gray-600">Explícito: {cancion.explicita ? 'Sí' : 'No'}</p>
                    <p class="text-gray-600">Violento: {cancion.esViolenta ? 'Sí' : 'No'}</p>
                    <a class="text-blue-500 underline mt-2 inline-block" href={`https://open.spotify.com/track/${cancion.spotifyId}`} target="_blank">Escuchar en Spotify</a>
                </li>
            {/each}
        </ul>
    </div>
</div>