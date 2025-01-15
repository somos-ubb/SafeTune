<script>
	import NavbarButton from "./navbarButton.svelte";

  let { letra } = $props();
  let showLetraPopup = $state(false);
    function handleLetra(){
      showLetraPopup = true;
  }
</script>

<NavbarButton onClick={handleLetra} label="Ver Letra" disabled={!letra}>
  Ver letra
</NavbarButton>

{#if showLetraPopup}
    <div class="absolute inset-0 bg-gray-500/50 backdrop-blur-sm z-50 flex justify-center items-center mx-4 xl:mx-64">
        <div class="bg-white p-4 rounded shadow-md max-h-[80vh] overflow-y-auto">
            <h3 class="text-xl font-semibold mb-2">Letra de la canción</h3>
            <p class="text-xs xl:text-base">{letra}</p>
            <button
                class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
                onclick={() => (showLetraPopup = false)}
            >
                Cerrar
            </button>
        </div>
    </div>
{/if}