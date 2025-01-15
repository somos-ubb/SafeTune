<script>
    import realimentacion from "../methods/realimentacion";
    let { track, realimentacion_component = $bindable() } = $props();
    let answer = '';

    async function selectAnswer(option) {
        answer = option;
        realimentacion_component = false; // Just in case
        if (option != 'No sabe') {
            await realimentacion(answer, track.id);
        }
    }
</script>

<div class="p-4 m-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h2 class="xl:text-xl font-semibold text-gray-700 text-center">
        La letra de la canción {track.name} contiene expresiones de violencia de género ¿Estás de acuerdo?
    </h2>
    <div class="flex space-x-4 justify-center">
        <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
            onclick={async () => await selectAnswer('Sí')}
        >
        Sí
        </button>
        <button
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring"
            onclick={async () => await selectAnswer('No')}
        >
        No
        </button>
        <button
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring"
            onclick={async () => await selectAnswer('No sabe')}
        >
        No sabe
        </button>
    </div>
</div>