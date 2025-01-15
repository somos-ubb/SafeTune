<script>
    import downloadJSONAsCSV from '../adminMethods/csvMethods'
    let { usuarios } = $props();
    // Reactive variables for filters
    let selectedSuscripcion = $state('');
    let sinExplicitoFilter = $state('both'); // 'both', 'yes', 'no'
    let adminFilter = $state('both'); // 'both', 'yes', 'no'
    let restrictivoFilter = $state('both'); // 'both', 'yes', 'no'

    // Derived filtered usuarios
    let filteredUsuarios = $derived(usuarios.filter(usuario => {
        return (
            (selectedSuscripcion === '' || usuario.suscripcion === selectedSuscripcion) &&
            (sinExplicitoFilter === 'both' || (sinExplicitoFilter === 'yes' && usuario.sinExplicito) || (sinExplicitoFilter === 'no' && !usuario.sinExplicito)) &&
            (adminFilter === 'both' || (adminFilter === 'yes' && usuario.admin) || (adminFilter === 'no' && !usuario.admin)) &&
            (restrictivoFilter === 'both' || (restrictivoFilter === 'yes' && usuario.restrictivo) || (restrictivoFilter === 'no' && !usuario.restrictivo))
        );
    }));
</script>

<div class="container mx-auto p-4 flex">
    <!-- Filters Section -->
    <aside class="w-1/4 p-4 bg-gray-100 rounded-lg mr-4">
        <h2 class="text-xl font-bold mb-4">Filtros</h2>
        
        <!-- Suscripcion Filter -->
        <div class="mb-4">
            <p class="block text-gray-700">Suscripción:</p>
            <select bind:value={selectedSuscripcion} class="mt-1 block w-full p-2 border border-gray-300 rounded-lg">
                <option value=''>Todos</option>
                {#each [...new Set(usuarios.map(u => u.suscripcion))] as suscripcion}
                    <option value={suscripcion}>{suscripcion}</option>
                {/each}
            </select>
        </div>
        
        <!-- Sin Explicito Filter -->
        <div class="mb-4">
            <p class="block text-gray-700">Sin Explícito:</p>
            <select bind:value={sinExplicitoFilter} class="mt-1 block w-full p-2 border border-gray-300 rounded-lg">
                <option value="both">Mostrar Ambos</option>
                <option value="yes">Mostrar Solo Sin Explícito</option>
                <option value="no">Mostrar Solo Con Explícito</option>
            </select>
        </div>
        
        <!-- Admin Filter -->
        <div class="mb-4">
            <p class="block text-gray-700">Admin:</p>
            <select bind:value={adminFilter} class="mt-1 block w-full p-2 border border-gray-300 rounded-lg">
                <option value="both">Mostrar Ambos</option>
                <option value="yes">Mostrar Solo Admins</option>
                <option value="no">Mostrar Solo No Admins</option>
            </select>
        </div>
        
        <!-- Restrictivo Filter -->
        <div>
            <p class="block text-gray-700">Restrictivo:</p>
            <select bind:value={restrictivoFilter} class="mt-1 block w-full p-2 border border-gray-300 rounded-lg">
                <option value="both">Mostrar Ambos</option>
                <option value="yes">Mostrar Solo Restrictivos</option>
                <option value="no">Mostrar Solo No Restrictivos</option>
            </select>
        </div>
    </aside>

    <!-- Users List Section -->
    <div class="w-3/4">
        <h1 class="text-2xl font-bold mb-4">Lista de Usuarios</h1>
        <button class="bg-violet-300 rounded" onclick={()=>downloadJSONAsCSV(usuarios)}>Descargar CSV de usuarios</button>
        <ul class="space-y-4">
            {#each filteredUsuarios as usuario}
                <li class="bg-white shadow-md rounded-lg p-4">
                    <a href={`usuarios/${usuario.spotifyId}`} class="text-xl font-semibold hover:text-gray-700">{usuario.nombre}</a>
                    <p class="text-gray-600">Email: {usuario.email}</p>
                    <p class="text-gray-600">Suscripción: {usuario.suscripcion}</p>
                    <p class="text-gray-600">Sin Explícito: {usuario.sinExplicito ? 'Sí' : 'No'}</p>
                    <p class="text-gray-600">Admin: {usuario.admin ? 'Sí' : 'No'}</p>
                    <p class="text-gray-600">Restrictivo: {usuario.restrictivo ? 'Sí' : 'No'}</p>
                    <a class="text-blue-500 underline mt-2 inline-block" href={`https://open.spotify.com/user/${usuario.spotifyId}`} target="_blank">Ver en Spotify</a>
                </li>
            {/each}
        </ul>
    </div>
</div>