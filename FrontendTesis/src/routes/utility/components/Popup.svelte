<script>
    import QuestionMark from "../svg/QuestionMark.svelte";
    import ThumbsUp from "../svg/ThumbsUp.svelte";
    import ThumbsDown from "../svg/ThumbsDown.svelte";
    import Cerrar from "../svg/Cerrar.svelte";
    import realimentacion from "../methods/realimentacion";
    let { track, togglePopup } = $props();
    async function thumbsUp(){
        await realimentacion(true, track.id);
        togglePopup();
    }
    async function thumbsDown(){
        await realimentacion(false, track.id);
        togglePopup();
    }
</script>

<div class="fixed top-16 right-4 bg-green-500 text-white p-6 rounded-2xl shadow-lg max-w-sm z-10">
    <button class="absolute top-2 right-2" onclick={togglePopup}>
        <Cerrar />
    </button>
    <p>¿Considera que la letra de "{track.name}" contiene expresiones de violencia de género?</p>
    <div class="flex space-x-2 mt-4 items-center justify-evenly">
        <button class="w-14 h-14 bg-green rounded-full border-2 border-white flex items-center justify-center" onclick={togglePopup}>
            <QuestionMark />
        </button>
        <button class="w-14 h-14 bg-green rounded-full border-2 border-white flex items-center justify-center" onclick={thumbsUp}>
            <ThumbsUp />
        </button>
        <button class="w-14 h-14 bg-green rounded-full border-2 border-white flex items-center justify-center" onclick={thumbsDown}>
            <ThumbsDown />
        </button>
    </div>
</div>