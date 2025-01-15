<script>
    import Cerrar from "../svg/Cerrar.svelte";
    import realimentacion from "../methods/realimentacion";
    let { track, toggleReport } = $props();
    async function thumbsUp(){
        await realimentacion(true, track.id);
        toggleReport();
    }
    async function thumbsDown(){
        await realimentacion(false, track.id);
        toggleReport();
    }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="fixed bg-green-600 text-white p-6 rounded-2xl shadow-lg max-w-sm w-full flex flex-col items-center justify-center">
        <button class="absolute top-2 right-2" onclick={toggleReport}>
            <Cerrar />
        </button>
        <h1 class="text-2xl font-semibold mb-4 text-center">Reportar</h1>
        <p class="text-lg mb-4 text-center">
            ¿Estás seguro de que deseas reportar la canción "{track.name}" por contener expresiones de violencia de género?
        </p>
        <p class="mb-4 text-center">Tu reporte ayudará a mantener un entorno seguro y respetuoso en nuestra plataforma</p>
        <div class="flex items-center justify-center">
            <button class="font-bold text-lg bg-white text-green-500 px-4 py-2 rounded-3xl text-center" onclick={thumbsUp}>Confirmar</button>
            <button class="font-bold text-lg border-2 border-white text-white px-4 py-2 rounded-3xl ml-2 text-center"onclick={toggleReport}>
                Cancelar
            </button>
        </div>
    </div>
</div>