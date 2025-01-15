<script>
    import { tokenStore } from "../stores/tokenStore";
    import { searchStore } from "../stores/searchStore";
    import { trackStore } from "../stores/trackStore";
    import playTrack from '../methods/playTrack';
    import playUri from '../methods/playUri'
    let { results } = $props();
    let option = "track";
    async function handleSelection(result) {
        if(option === 'track'){
            trackStore.set(result);
            await playTrack(result, $tokenStore);
        }
        else{
            await playUri(result, $tokenStore)
        }
        searchStore.set('');
    }
    function cleanNombre(nombre) {
        // Replace & with y
        const replacedNombre = nombre.replace(/&/g, 'y');
        // Find the index of the first occurrence of a special character
        const index = replacedNombre.search(/[-(?]/);
        // Return the substring before the special character or the cleaned nombre if no special character is found
        return index !== -1 ? replacedNombre.substring(0, index).trim() : replacedNombre.trim();
    };
</script>

<ul class="flex flex-col my-4 xl:my-12 mt-12 mx-4 w-4/5 sm:w-2/3 lg:w-1/2 overflow-auto h-[48rem]">
    {#each results as result}
        <li class="flex flex-row bg-zinc-800">
            <img alt='album' src={result.album.images[2].url}/>
            <button class="text-zinc-200 shadow w-full h-12" onclick={() => handleSelection(result)}>
                {cleanNombre(result.name)}{(result.artists && result.artists.length > 0) ? ' - ' + result.artists[0].name : ''}
            </button>
        </li>
    {/each}
</ul>