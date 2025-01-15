<script>
  let { color, disabled } = $props();
  let new_color = $derived(disabled ? 'fill-red-400' : color ? 'fill-green-500' : 'fill-white'); 
</script>

<svg xmlns="http://www.w3.org/2000/svg" class={new_color} width="39.998" height="40"  viewBox="0 0 39.998 40"><path d="M34.237,6.252a7.3,7.3,0,0,0-12.372,4l8.375,8.375a7.3,7.3,0,0,0,4-12.372Zm-7.547,14.3-6.755-6.757-8.1,9.226-6.9,7.854a3.319,3.319,0,0,0,4.684,4.684l7.892-6.933,9.182-8.07ZM17.973,10.172A11.17,11.17,0,1,1,30.317,22.516l-10.25,9.009-7.892,6.935A7.188,7.188,0,0,1,2.031,28.317l6.9-7.854,9.04-10.291Z" transform="translate(-0.247 -0.245)"/></svg>