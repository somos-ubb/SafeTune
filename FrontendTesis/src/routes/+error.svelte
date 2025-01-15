<script>
    import ErrorTemplate from "./ErrorTemplate.svelte";
    import { page } from '$app/stores'
    let errorMessage = $page.status === 404 ? 'No se encuentra' : $page.error.message
</script>

<ErrorTemplate  errorCode={$page.status} 
                errorMessage={errorMessage} >
                </ErrorTemplate>