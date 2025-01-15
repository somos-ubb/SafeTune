<script>
    import Reporte from "../svg/Reporte.svelte";
    let { toggleReport } = $props();
</script>

<button onclick={toggleReport} class="absolute top-4 right-4">
    <Reporte/>
</button>