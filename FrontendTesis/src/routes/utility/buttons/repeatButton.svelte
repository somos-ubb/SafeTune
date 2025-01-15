<script>
  import Repeat from "../svg/Repeat.svelte";
  import RepeatOne from "../svg/RepeatOne.svelte";
  let { accessToken, repeat = $bindable() } = $props();
  let repeatState = $state('');

  const stateMapping = {
    0: { value: 'context'}, //replace 'No Repetir with '
    1: { value: 'track'},
    2: { value: 'off' }
  };

  // Función para establecer el estado de repetición en función de previousState
  function setRepeatState() {
    repeatState = stateMapping[repeat]?.value || 'context'; // Valor predeterminado 'context' si no se encuentra una coincidencia
    sendRepeatState();
  }

  // Función para enviar la solicitud con el estado de repetición actualizado
  async function sendRepeatState() {
    const url = 'https://api.spotify.com/v1/me/player/repeat?state=' + repeatState;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      });

      if (!response.ok) {
        throw new Error('Failed to set repeat state');
      }

    } catch (error) {
      console.error('Error setting repeat state:', error);
    }
  }
</script>

<button onclick={setRepeatState}>
  {#if repeatState==='context'}
    <Repeat color={'green'}/>
  {:else if repeatState==='track'}
    <RepeatOne/>
  {:else}
    <Repeat color={'white'}/>
  {/if}
</button>
