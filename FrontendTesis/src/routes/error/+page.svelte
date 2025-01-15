<script>
    /*La razón de este código es que no puedo hacer un fetch directo a spotify debido a CORS, por lo que el error handling está hecho a través de stores y redirecciones
    para satistfacer la sensación de un error handling limpio*/ 
    import { setError } from '../utility/stores/errorStore';
    import { goto } from "$app/navigation";
	import { onMount } from 'svelte';
    let { data } = $props();
    setError(data.code, data.message);
    onMount(()=>goto('/'));
</script>

<div class="bg-zinc-900 min-h-screen"></div>