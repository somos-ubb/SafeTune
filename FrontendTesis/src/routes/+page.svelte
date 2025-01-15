<script>
    import ErrorTemplate from './ErrorTemplate.svelte';
    import Login from './Login.svelte';
    import WebPlayback from './WebPlayback.svelte';
    import { errorStore } from "./utility/stores/errorStore";
    import { tokenStore } from './utility/stores/tokenStore';
    let { data } = $props();
    let code = $state();
    let message = $state();
    let error = $state(false);
    $tokenStore = data.access_token;
    if($errorStore !== null){
        code = $errorStore.code;
        message = $errorStore.message;
        errorStore.set(null);
        error = true;
    }
</script>
{#if !error}
    {#if $tokenStore === null}
        <Login/>
    {:else}
        <WebPlayback expires={data.expires} restrictivo={data.restrictivo}/>
    {/if}
{:else}
    <ErrorTemplate  errorCode={code} 
    errorMessage={message} 
    imageSrc={`https://http.cat/${code}`} 
    imageAlt={`error${code}`}>
    </ErrorTemplate>
{/if}

