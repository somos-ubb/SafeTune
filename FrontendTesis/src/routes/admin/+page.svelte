<script>
    import ErrorTemplate from "../ErrorTemplate.svelte"
	import Admin from "./Admin.svelte";
    import getPermissions from "./adminMethods/getPermissions"
    import LoadingPageWhite from "../utility/components/LoadingPageWhite.svelte"
	import { onMount } from "svelte";
    let data;
    let permited = $state(0);
    onMount(async ()=>{
            data = await getPermissions();
            if(data){
                permited = 1;
            }
            else{
                permited = 2;
            };
        }
    )
</script>

{#if permited == 0}
    <LoadingPageWhite/>
{:else if permited == 1}
    <Admin/>
{:else}
    <ErrorTemplate  errorCode={404} 
        errorMessage={'No se encuentra'} 
        imageSrc={`https://http.cat/404`} 
        imageAlt={`error404`}>
    </ErrorTemplate>
{/if}
