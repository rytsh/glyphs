<script lang="ts">
  export let glyph = "";

  let copied = false;

  let className = "";
  export { className as class };
</script>

<button
  class={`${
    copied
      ? "!bg-green-500 text-white hover:!bg-green-500"
      : "hover:!bg-yellow-200"
  } ${className} focus:outline-4 focus:outline-indigo-500 focus:bg-yellow-100 focus:z-10`}
  title="click to copy clipboard"
  on:click={() => {
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 500);
    navigator.clipboard.writeText(glyph);
  }}
>
  {glyph}
</button>
