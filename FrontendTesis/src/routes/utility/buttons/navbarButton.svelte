<script>
  /**
   * @typedef {Object} Props
   * @property {any} label
   * @property {any} onClick
   * @property {boolean} [disabled]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let {
    label,
    onClick,
    disabled = false,
    children
  } = $props();
  </script>
  
  <button
    onclick={onClick}
    class={`flex flex-row justify-evenly block px-3 py-2 rounded-md text-sm xl:text-base font-medium ${
      disabled ? 'text-red-400' : 'text-gray-300 hover:text-white'
    }`}
    disabled={disabled}>
    {@render children?.()} <p class='ml-4 hidden xl:block'>{label}</p>
  </button>