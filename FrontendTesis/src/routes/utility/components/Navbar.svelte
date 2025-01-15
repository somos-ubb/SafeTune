<script>
    import { run } from 'svelte/legacy';
	import LogoutButton from '../buttons/logoutButton.svelte';
    import NavbarButton from '../buttons/navbarButton.svelte';
	import Search from './Search.svelte';
    import { searchStore }  from '../stores/searchStore';
    import Inicio from '../svg/Inicio.svelte';
	import AcercaDeMi from '../svg/AcercaDeMi.svelte';
	import ModoRestrictivoActivado from '../svg/ModoRestrictivoActivado.svelte';
	import ModoRestrictivoDesactivado from '../svg/ModoRestrictivoDesactivado.svelte';
	import AcercaDeProyecto from '../svg/AcercaDeProyecto.svelte';
    let {
        restrictivo,
        handleRestrictivoChange,
        acerca_de = $bindable(),
        acerca_de_proyecto_comp = $bindable(),
        results = $bindable(),
        option = $bindable("track"),
    } = $props();

    function handleInicio() {
        acerca_de = false;
        acerca_de_proyecto_comp = false;
    }
    function handleAcercaDe() {
        acerca_de = true;
        acerca_de_proyecto_comp = false;
    }
    function handleAcercaDeProyecto(){
        acerca_de_proyecto_comp = true;
        acerca_de = false;
    }
    
    let hasSearchValue = $state(false);

    run(() => {
        hasSearchValue = !!$searchStore;
    });  // Reactive statement to update hasSearchValue based on searchStore
    // Use onMount to attach event listener when the component is mounted
</script>

<!-- Navbar HTML -->
<nav class="flex items-center justify-evenly bg-zinc-800 w-full">  
    <NavbarButton onClick={handleInicio} label="Inicio"><Inicio/></NavbarButton>
    <NavbarButton onClick={handleAcercaDe} label="Acerca de mi"><AcercaDeMi/></NavbarButton>
    <NavbarButton onClick={handleAcercaDeProyecto} label="Acerca del proyecto"><AcercaDeProyecto/></NavbarButton>
    {#if restrictivo}
        <NavbarButton
            label={restrictivo ? 'Modo Restrictivo' : 'Modo No Restrictivo'}
            onClick={handleRestrictivoChange}
        ><ModoRestrictivoActivado />
    </NavbarButton>
    {:else}
        <NavbarButton
            label={restrictivo ? 'Modo Restrictivo' : 'Modo No Restrictivo'}
            onClick={handleRestrictivoChange}
        ><ModoRestrictivoDesactivado /></NavbarButton>
    {/if}
    <Search bind:results bind:option/>
    <LogoutButton/>
</nav>

