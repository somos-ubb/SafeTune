<script>
    import ErrorTemplate from "../../../ErrorTemplate.svelte"
	import CancionesUsuario from "./CancionesUsuario.svelte";
    import getPermissions from "../../adminMethods/getPermissions"
    import LoadingPageWhite from "../../../utility/components/LoadingPageWhite.svelte"
    import getUserSongs from "../../adminMethods/getUserSongs"
	import { onMount } from "svelte";
    let { data } = $props();
    let permission;
    let datos = $state();
    let permited = $state(0);
    onMount(async ()=>{
            permission = await getPermissions();
            if(permission){
                datos = await getUserSongs(data.usuarioCanciones);
                permited = 1;
            }
            else{
                permited = 2;
            };
        }
    )
</script>

{#if permited == 0 || (permited == 1 && !datos)}
    <LoadingPageWhite color={false}/>
{:else if permited == 1 && datos}
    <CancionesUsuario cancionesUsuario={datos.cancionesUsuario} usuarioCanciones={data.usuarioCanciones}/>
{:else}
    <ErrorTemplate  errorCode={404} 
        errorMessage={'No se encuentra'} 
        imageSrc={`https://http.cat/404`} 
        imageAlt={`error404`}>
    </ErrorTemplate>
{/if}
