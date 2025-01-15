<script>
    import Correo from "../svg/Correo.svelte";
    import GitHub from "../svg/GitHub.svelte";
    import LinkedIn from "../svg/LinkedIn.svelte";

</script>
<div class="container flex flex-row justify-center">
    <div class="py-4 xl:py-12 items-center flex flex-col justify-center mt-12 mx-4 w-4/5 sm:w-2/3 lg:w-1/2 h-[48rem] bg-zinc-800">
        <h1 class="text-3xl xl:text-4xl font-semibold text-white">Acerca de mi</h1>
        <hr class="h-5 w-full mt-3 border-t-2 border-green-700"/>
        <p class="px-3 text-2xl text-white whitespace-pre-wrap overflow-y-auto">
        Hola, soy Cristopher Andrés Quintana Reyes, ingeniero en Computación e Informática. A lo largo de mi carrera, he desarrollado una profunda pasión por la versatilidad y la innovación, que considero esenciales para alcanzar objetivos ambiciosos. El diseño web es uno de los campos en los que he podido canalizar mi creatividad y habilidades técnicas, y este proyecto es un reflejo de ese compromiso.
        <br/>
        <br/>
        Con el uso de herramientas avanzada y un enfoque constante en la calidad y la usabilidad, he logrado llevar a cabo este proyecto con el objetivo de ofrecer una experiencia que sea tanto funcional como visualmente atractiva. Mi formación en ingeniería me ha permitido abordar desafíos complejos y encontrar soluciones efectivas, aplicando un pensamiento crítico y un enfoque orientado a resultados.
        <br/>
        <br/>
        Más allá del ámbito profesional, soy un apasionado del deporte, una disciplina que me inspira por su camacidad para mostrar la fuerza y la resiliencia del espíritu humano. Creo firmemente en el poder de la perseverancia y la superación personal, valores que trato de incorporar tanto en mi vida profesional como personal.
        </p> 
    </div>
    <div class="flex flex-col mx-4 w-4/5 mt-12 sm:w-2/3 lg:w-1/2 h-[48rem]">
        <div class="h-4/5 w-full bg-zinc-800 mb-8 flex justify-center">
            <img class="p-16 h-full" src="/Foto-Cristopher-sin-fondo.png" alt="Cristopher">
        </div>
        <div class="h-1/5 w-full bg-zinc-800 flex justify-around pt-8">
            <a href="mailto:crisquintana33@gmail.com"><Correo/></a>
            <a href="https://www.linkedin.com/in/cristopher-quintana-39071320b/"><LinkedIn/></a>
            <a href="https://github.com/CristopherQuintana"><GitHub/></a>
        </div>
    </div>
</div>