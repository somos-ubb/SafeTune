<script>
    import CerrarSesion from "../svg/CerrarSesion.svelte";
  </script>
  
  <!-- Container for the button and SVG -->
  <div class="flex items-center">
    <!-- Button: visible on xl screens and larger -->
    <a
      href="/logout" rel="external"
      class="hidden xl:block text-sm xl:text-base font-medium text-white bg-green-500 hover:bg-green-700 py-2 px-4 rounded-full"
    >
      Cerrar Sesión
    </a>
  
    <!-- SVG: visible on screens smaller than xl -->
    <div class="block xl:hidden">
      <a href="/logout" rel="external">
        <CerrarSesion />
      </a>
    </div>
  </div>