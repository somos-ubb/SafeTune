<script>
  import { run } from 'svelte/legacy';

  import { searchStore }  from '../stores/searchStore';
  import { tokenStore } from "../stores/tokenStore";
  import searchApi from '../methods/searchApi';
	import Lens from '../svg/Lens.svelte';
	import { onMount } from 'svelte';

  let { results = $bindable(), option = $bindable() } = $props();
  let placeholderText = $state("¿Qué quieres reproducir?");

  const updatePlaceholder = () => {
    placeholderText = window.innerWidth < 1280 ? "Buscar" : "¿Qué quieres reproducir?";
  };

  // Update placeholder on mount and window resize
  onMount(() => {
    updatePlaceholder(); // Set initial placeholder based on screen size
    window.addEventListener("resize", updatePlaceholder);

    return () => window.removeEventListener("resize", updatePlaceholder);
  });

  async function fetchInfo(query, option) {
    if (query.trim() === '') {
      results = [];
      return;
    }

    try {
      const data = await searchApi(query, $tokenStore, option);
      if (data && data[option + 's']) {
        results = data[option + 's'].items;
      } else {
        results = [];
      }
    } catch (error) {
      console.error('Error fetching results:', error);
      results = [];
      window.location.reload();
    }
  }

  run(() => {
    fetchInfo($searchStore, option);
  });

</script>

<div class="flex flex-col xl:flex-row items-center w-1/6 xl:w-fit xl:mr-2">
  <div class="relative w-full">
    <input
    id="search"
    type="text"
    bind:value={$searchStore}
    placeholder={placeholderText}
    class="pl-10 p-2 border border-gray-400 rounded-full w-full xl:w-fit"
  />
    <div class="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
      <Lens />
    </div>
  </div>
</div>