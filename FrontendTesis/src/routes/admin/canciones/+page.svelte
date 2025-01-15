<script>
    import ErrorTemplate from "../../ErrorTemplate.svelte"
	import Canciones from "./Canciones.svelte";
    import getPermissions from "../adminMethods/getPermissions"
    import LoadingPageWhite from "../../utility/components/LoadingPageWhite.svelte"
    import getAdmin from "../adminMethods/getAdmin"
	import { onMount } from "svelte";
    let permission;
    let datos = $state();
    let permited = $state(0);
    onMount(async ()=>{
            permission = await getPermissions();
            if(permission){
                datos = await getAdmin('songs');
                permited = 1;
            }
            else{
                permited = 2;
            };
        }
    )
</script>

{#if permited == 0 || (permited == 1 && !datos)}
    <LoadingPageWhite/>
{:else if permited == 1 && datos}
    <Canciones canciones={datos}/>
{:else}
    <ErrorTemplate  errorCode={404} 
        errorMessage={'No se encuentra'} 
        imageSrc={`https://http.cat/404`} 
        imageAlt={`error404`}>
    </ErrorTemplate>
{/if}
