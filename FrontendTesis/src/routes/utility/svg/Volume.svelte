<script>
    import VolumeMax from "./volume/VolumeMax.svelte";
    import VolumeMid from "./volume/VolumeMid.svelte";
    import VolumeMin from "./volume/VolumeMin.svelte";
    import VolumeZero from "./volume/VolumeZero.svelte";
    let { value } = $props();
</script>

{#if value > 70}
    <VolumeMax/>
{:else if value > 35}
    <VolumeMid/>
{:else if value > 0}
    <VolumeMin/>
{:else}
    <VolumeZero/>
{/if}
