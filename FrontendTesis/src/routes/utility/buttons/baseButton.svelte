<script>
    let { method, text } = $props();
</script>

<button class="bg-green-600 rounded-full border border-green-800 inline-block cursor-pointer text-white font-bold text-xs sm:text-sm md:text-base text-center w-28 h-10 sm:w-32 sm:h-12 md:w-44 md:h-16 px-4 py-2 md:px-8 md:py-4 mr-2 mb-2" onclick={method}>
    {text}
</button>