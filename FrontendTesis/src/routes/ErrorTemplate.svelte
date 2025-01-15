<script>
    import ErrorSvg from './utility/svg/Error.svelte';
    let { errorCode, errorMessage } = $props();
</script>

<div class="flex items-center justify-center bg-zinc-900 min-h-screen">
    <div class="flex flex-col justify-center items-center bg-green-600 rounded-3xl p-4">
        <ErrorSvg/>
        <p class= "text-white text-5xl font-bold py-2">Error {errorCode}</p>
        <p class= "text-white text-2xl font-bold pb-2">{errorMessage}</p>
        <a href="/" rel="external" class= "text-white text-xl border-white rounded-3xl p-2 border-2">Volver a la página principal</a> 
    </div>
</div>